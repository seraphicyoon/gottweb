-- Ejecutar después de supabase/classroom.sql en el SQL Editor de Supabase.
begin;
create table if not exists public.gets_student_tracking (
 user_id uuid primary key references auth.users(id) on delete cascade,
 cycle integer not null default 1 check(cycle > 0)
);
create table if not exists public.gets_attendance (
 user_id uuid not null references auth.users(id) on delete cascade,
 session_date date not null,
 status text not null check(status in ('present','absent','excused')),
 cycle integer not null check(cycle > 0),
 recorded_by uuid references auth.users(id) on delete set null,
 updated_at timestamptz not null default now(),
 primary key(user_id,session_date)
);
create table if not exists public.gets_student_recoveries (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 cycle integer not null,
 note text not null check(char_length(note) between 1 and 1000),
 recorded_by uuid references auth.users(id) on delete set null,
 created_at timestamptz not null default now()
);
insert into public.gets_student_tracking(user_id) select user_id from public.gets_students on conflict do nothing;
alter table public.gets_student_tracking enable row level security;
alter table public.gets_attendance enable row level security;
alter table public.gets_student_recoveries enable row level security;
revoke all on public.gets_student_tracking,public.gets_attendance,public.gets_student_recoveries from anon,authenticated;
grant select on public.gets_student_tracking,public.gets_attendance,public.gets_student_recoveries to authenticated;
drop policy if exists "Own attendance tracking" on public.gets_student_tracking;
create policy "Own attendance tracking" on public.gets_student_tracking for select to authenticated using(user_id=(select auth.uid()) or (select public.gets_is_admin()));
drop policy if exists "Own attendance" on public.gets_attendance;
create policy "Own attendance" on public.gets_attendance for select to authenticated using(user_id=(select auth.uid()) or (select public.gets_is_admin()));
drop policy if exists "Own recovery history" on public.gets_student_recoveries;
create policy "Own recovery history" on public.gets_student_recoveries for select to authenticated using(user_id=(select auth.uid()) or (select public.gets_is_admin()));

create or replace function public.gets_check_student_enrollment() returns trigger
language plpgsql security definer set search_path='' as $$
declare current_cycle integer;
begin
 insert into public.gets_student_tracking(user_id) values(new.user_id) on conflict do nothing;
 select cycle into current_cycle from public.gets_student_tracking where user_id=new.user_id for update;
 if (select count(*) from public.gets_attendance where user_id=new.user_id and cycle=current_cycle and status='absent') >= 3 then
  raise exception 'Tiene tres faltas vigentes. Usa Reactivar por recuperación.';
 end if;
 return new;
end $$;
drop trigger if exists gets_check_student_enrollment on public.gets_students;
create trigger gets_check_student_enrollment before insert on public.gets_students for each row execute function public.gets_check_student_enrollment();

create or replace function public.gets_record_attendance(target_user_id uuid, attendance_date date, attendance_status text)
returns void language plpgsql security definer set search_path='' as $$
declare current_cycle integer;
begin
 if auth.uid() is null or not public.gets_is_admin() then raise exception 'Solo administradoras' using errcode='42501'; end if;
 if attendance_date is null or attendance_date > current_date or attendance_status is null or attendance_status not in ('present','absent','excused') then raise exception 'Fecha o estado inválido'; end if;
 insert into public.gets_student_tracking(user_id) values(target_user_id) on conflict do nothing;
 select cycle into current_cycle from public.gets_student_tracking where user_id=target_user_id for update;
 if not exists(select 1 from public.gets_students where user_id=target_user_id)
    and not exists(select 1 from public.gets_attendance where user_id=target_user_id and session_date=attendance_date) then
  raise exception 'Da de alta o reactiva a la alumna antes de registrar nuevas clases';
 end if;
 insert into public.gets_attendance(user_id,session_date,status,cycle,recorded_by)
 values(target_user_id,attendance_date,attendance_status,current_cycle,auth.uid())
 on conflict(user_id,session_date) do update set status=excluded.status,recorded_by=auth.uid(),updated_at=now();
 if (select count(*) from public.gets_attendance where user_id=target_user_id and cycle=current_cycle and status='absent') >= 3 then
  delete from public.gets_students where user_id=target_user_id;
 end if;
end $$;

create or replace function public.gets_reactivate_student(target_user_id uuid, recovery_note text)
returns void language plpgsql security definer set search_path='' as $$
declare current_cycle integer;
begin
 if auth.uid() is null or not public.gets_is_admin() then raise exception 'Solo administradoras' using errcode='42501'; end if;
 if recovery_note is null or char_length(btrim(recovery_note)) not between 1 and 1000 then raise exception 'Escribe el trabajo o motivo de recuperación'; end if;
 if public.gets_is_banned(target_user_id) then raise exception 'Primero retira la restricción de esta cuenta'; end if;
 insert into public.gets_student_tracking(user_id) values(target_user_id) on conflict do nothing;
 select cycle into current_cycle from public.gets_student_tracking where user_id=target_user_id for update;
 if exists(select 1 from public.gets_students where user_id=target_user_id) then raise exception 'La alumna ya está activa'; end if;
 if not exists(select 1 from public.gets_attendance where user_id=target_user_id) then raise exception 'Esta cuenta no tiene historial; usa Dar de alta como alumna'; end if;
 update public.gets_student_tracking set cycle=current_cycle+1 where user_id=target_user_id;
 insert into public.gets_student_recoveries(user_id,cycle,note,recorded_by) values(target_user_id,current_cycle+1,btrim(recovery_note),auth.uid());
 insert into public.gets_students(user_id,enrolled_by) values(target_user_id,auth.uid());
end $$;

create or replace function public.gets_attendance_profile(target_user_id uuid)
returns jsonb language plpgsql stable security definer set search_path='' as $$
declare result jsonb;
begin
 if auth.uid() is null or (target_user_id is distinct from auth.uid() and not public.gets_is_admin()) then raise exception 'Acceso denegado' using errcode='42501'; end if;
 select jsonb_build_object(
 'cycle',coalesce(t.cycle,1),
 'is_student',exists(select 1 from public.gets_students where user_id=target_user_id),
 'present_total',(select count(*) from public.gets_attendance where user_id=target_user_id and status='present'),
 'absent_total',(select count(*) from public.gets_attendance where user_id=target_user_id and status='absent'),
 'active_absences',(select count(*) from public.gets_attendance where user_id=target_user_id and cycle=coalesce(t.cycle,1) and status='absent'),
 'history',coalesce((select jsonb_agg(to_jsonb(a) order by a.session_date desc) from public.gets_attendance a where a.user_id=target_user_id),'[]'::jsonb),
 'recoveries',coalesce((select jsonb_agg(to_jsonb(r) order by r.created_at desc) from public.gets_student_recoveries r where r.user_id=target_user_id),'[]'::jsonb)
 ) into result from (select 1) x left join public.gets_student_tracking t on t.user_id=target_user_id;
 return result;
end $$;
revoke all on function public.gets_check_student_enrollment() from public,anon,authenticated;
revoke all on function public.gets_record_attendance(uuid,date,text),public.gets_reactivate_student(uuid,text),public.gets_attendance_profile(uuid) from public,anon;
grant execute on function public.gets_record_attendance(uuid,date,text),public.gets_reactivate_student(uuid,text),public.gets_attendance_profile(uuid) to authenticated;
commit;

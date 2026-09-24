
  # GOTT PAGINA

  This is a code bundle for GOTT PAGINA. The original project is available at https://www.figma.com/design/vQrx9pMnCCZbs3AOZYgOJJ/GOTT-PAGINA.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  
## Acceso de alumnas y moderación de comentarios

1. En el proyecto Supabase de GETS, ejecuta `supabase/gallery_comments.sql` una vez desde **SQL Editor**. Si ya existe alguna tabla con esos nombres, revisa sus políticas antes de ejecutarlo.
2. La URL y la clave publishable del proyecto nuevo de GETS están configuradas en `src/app/supabase.ts`; no hace falta añadir variables en el hosting para este proyecto. Si cambias de proyecto, `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` permiten sustituirlas al compilar. Nunca incluyas la `service_role` en el sitio. Reconstruye y despliega la página.
3. En **Authentication → URL Configuration**, usa `https://www.getstam.site/` como Site URL y agrégala también a Redirect URLs. Esta URL se utiliza en invitaciones y recuperación de contraseña. Invita a las alumnas desde **Authentication → Users → Invite user**. Al abrir la invitación, entran a GETS, pulsan **Ingresar → Crear o cambiar contraseña** y establecen una contraseña de al menos 8 caracteres. Después pueden iniciar sesión con su correo y contraseña. El sitio no ofrece registro abierto.
4. Invita a la administradora, copia su correo exacto y ejecuta el `insert` comentado al final del SQL sustituyendo `ADMIN_EMAIL_HERE`. La tabla `gets_admins` controla quién puede aprobar y rechazar comentarios; el selector visual ya no concede acceso.
5. Comprueba con una cuenta de alumna que el comentario queda pendiente y no aparece públicamente. Entra con la cuenta administradora, abre **Ingresar → Ir a moderación**, apruébalo y verifica que aparece en la galería.

Los comentarios se limitan a 1000 caracteres y solo se aceptan de cuentas autenticadas. Las políticas RLS hacen cumplir la aprobación desde Supabase. No hay claves de Supabase ni cuentas de alumnas en el repositorio.

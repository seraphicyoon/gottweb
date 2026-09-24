
  # GOTT PAGINA

  This is a code bundle for GOTT PAGINA. The original project is available at https://www.figma.com/design/vQrx9pMnCCZbs3AOZYgOJJ/GOTT-PAGINA.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  
## Acceso de alumnas y moderación de comentarios

1. Si ya ejecutaste el SQL inicial de GETS, ejecuta solamente `supabase/upgrade_comments_and_moderation.sql` en **SQL Editor**. Agrega la asociación de cada comentario con su foto o artículo, y los permisos de moderación y restricción de usuarios, sin borrar datos. Para instalaciones nuevas, `supabase/gallery_comments.sql` ya incluye todo.
2. La URL y la clave publishable del proyecto nuevo de GETS están configuradas en `src/app/supabase.ts`; no hace falta añadir variables en el hosting para este proyecto. Si cambias de proyecto, `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` permiten sustituirlas al compilar. Nunca incluyas la `service_role` en el sitio. Reconstruye y despliega la página.
3. En **Authentication → URL Configuration**, usa `https://www.getstam.site/` como Site URL y agrégala también a Redirect URLs. Esta URL se utiliza en invitaciones y recuperación de contraseña. Las alumnas usan **Ingresar → Crear cuenta** con nombre, correo y contraseña de al menos 8 caracteres. Si Supabase solicita verificación, confirman el correo antes de entrar. El enlace **¿Aún no eres parte? Únete aquí** abre ese formulario.
4. Crea también la cuenta de la administradora desde el formulario, copia su correo exacto y ejecuta el `insert` comentado al final del SQL sustituyendo `ADMIN_EMAIL_HERE`. La tabla `gets_admins` controla quién puede aprobar y rechazar comentarios; el selector visual ya no concede acceso.
5. Comprueba con una cuenta de alumna que el comentario queda pendiente y no aparece públicamente. Entra con la cuenta administradora, abre **Ingresar → Ir a moderación**, apruébalo y verifica que aparece en la galería.

El componente de comentarios usa `content_type` y un `content_id` estable para mantener separados los comentarios de cada foto o artículo. Al añadir contenido en el futuro, coloca `CommentsSection` con un ID nuevo. Los comentarios se limitan a 1000 caracteres y solo se aceptan de cuentas autenticadas. Las políticas RLS hacen cumplir la aprobación desde Supabase. La clave publishable es pública por diseño; no hay claves secretas ni cuentas de alumnas en el repositorio.

## Panel de moderación

La cuenta administradora ve pendientes, aprobados y rechazados; puede aprobar, rechazar u ocultar comentarios. También puede restringir o rehabilitar cuentas que ya han comentado, y solicitar un correo de recuperación de contraseña para una alumna. La restricción bloquea nuevos comentarios y oculta los aprobados mientras esté activa; no elimina la cuenta de Supabase ni impide iniciar sesión. El bloqueo se aplica mediante RLS y se registra el motivo y la cuenta administradora.

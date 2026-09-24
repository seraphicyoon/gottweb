
  # GOTT PAGINA

  This is a code bundle for GOTT PAGINA. The original project is available at https://www.figma.com/design/vQrx9pMnCCZbs3AOZYgOJJ/GOTT-PAGINA.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  
## Acceso de alumnas y moderación de comentarios

1. En el proyecto Supabase de GETS, ejecuta `supabase/gallery_comments.sql` una vez desde **SQL Editor**. Si ya existe alguna tabla con esos nombres, revisa sus políticas antes de ejecutarlo.
2. En el proveedor de hosting configura `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` con los valores de **Project Settings → API**. Usa únicamente la clave pública/publishable; nunca incluyas la `service_role` en el sitio. Reconstruye y despliega la página.
3. En **Authentication → URL Configuration**, configura la URL pública como Site URL y agrega esa misma URL a Redirect URLs para la recuperación de contraseña. Invita a las alumnas desde **Authentication → Users → Invite user**. Pueden iniciar sesión con su correo y contraseña. El sitio no ofrece registro abierto.
4. Invita a la administradora, copia su correo exacto y ejecuta el `insert` comentado al final del SQL sustituyendo `ADMIN_EMAIL_HERE`. La tabla `gets_admins` controla quién puede aprobar y rechazar comentarios; el selector visual ya no concede acceso.
5. Comprueba con una cuenta de alumna que el comentario queda pendiente y no aparece públicamente. Entra con la cuenta administradora, abre **Ingresar → Ir a moderación**, apruébalo y verifica que aparece en la galería.

Los comentarios se limitan a 1000 caracteres y solo se aceptan de cuentas autenticadas. Las políticas RLS hacen cumplir la aprobación desde Supabase. No hay claves de Supabase ni cuentas de alumnas en el repositorio.

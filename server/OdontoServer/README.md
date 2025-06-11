# OdontoServer Backend

Este proyecto es un backend para una clínica de bienestar integral , implementado en ASP.NET Core con Entity Framework Core y PostgreSQL. Está diseñado usando la **Arquitectura Hexagonal (Ports & Adapters)** para separar la lógica de negocio del acceso a datos y la infraestructura.

---

## ¿Qué es la Arquitectura Hexagonal?

La **Arquitectura Hexagonal** (también llamada "Ports & Adapters") es un patrón de diseño que separa el núcleo de la aplicación (la lógica de negocio) de los detalles externos como bases de datos, APIs, frameworks, etc. 

**¿Por qué es útil?**
- Facilita las pruebas unitarias.
- Permite cambiar la base de datos o la interfaz de usuario sin afectar la lógica principal.
- Hace el código más mantenible y escalable.

En este proyecto:
- El dominio (Entities) representa el núcleo.
- La infraestructura (Data, Adapters) y los controladores (API) son los adaptadores.

---

## Modelos principales (Entities)

- **User**: Representa un usuario del sistema.
  - `Id` (Guid), `Username`, `Email`, `PasswordHash`
- **Service**: Un servicio ofrecido por la clínica.
  - `Id` (int), `Name`
- **Banner**: Banner principal de la sección de servicios.
  - `Id` (int), `Title`, `Subtitle`
- **BlogPost**: Entrada de blog.
  - `Id` (int), `Image`, `Title`, `Details`
- **BlogBanner**: Banner de la sección de blog.
  - `Id` (int), `Title`, `Subtitle`
- **MapEmbed**: URL embebida de Google Maps para mostrar la ubicación.
  - `Id` (int), `Embed`
- **ContactMessage**: Mensaje enviado desde el formulario de contacto.
  - `Id` (int), `Name`, `Email`, `Message`, `CreatedAt`
- **Appointment**: Cita reservada por un paciente.
  - `Id` (int), `UserId` (Guid), `ServiceId` (int), `DateTime` (DateTime UTC), `Status`

---

## Endpoints principales

- `/api/auth` — Registro y login (JWT)
- `/api/services` — Listado de servicios
- `/api/contacts` — Enviar y listar mensajes de contacto
- `/api/blog` — CRUD de posts y banners de blog
- `/api/map` — Obtener/actualizar embed de Google Maps
- `/api/appointments` — Reservar y listar citas (requiere autenticación)

---

## Primeros pasos en Windows

1. **Instala [.NET 9 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/9.0)**
2. **Instala [PostgreSQL](https://www.postgresql.org/download/windows/)** y crea una base de datos (ej: `odonto_sandy`)
3. Configura la cadena de conexión en `appsettings.json`:
   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Host=localhost;Database=odonto_sandy;Username=postgres;Password=TU_PASSWORD(debe ser postgres)"
   }
   ```
4. Abre una terminal en la carpeta del proyecto y ejecuta:
   ```bash
   dotnet restore
   dotnet ef database update
   dotnet run
   ```
5. El backend estará disponible en `http://localhost:5000` o el puerto configurado.

---

## Consejos
- Usa herramientas como [Postman](https://www.postman.com/) para probar los endpoints.
- Todos los endpoints de citas requieren JWT (login primero).
- Los modelos están en la carpeta `Domain/Entities`.
- Puedes modificar los modelos y ejecutar nuevas migraciones con:
  ```bash
  dotnet ef migrations add NombreDeLaMigracion
  dotnet ef database update
  ```

---

## Recursos útiles
- [Documentación oficial de .NET](https://learn.microsoft.com/es-es/dotnet/)
- [Documentación de Entity Framework Core](https://learn.microsoft.com/es-es/ef/core/)
- [¿Qué es la arquitectura hexagonal? (Artículo)](https://apiumhub.com/es/tech-blog-barcelona/arquitectura-hexagonal/)

---



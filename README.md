# Clínica Armonía Vital Frontend

Este proyecto es el frontend para una clínica de bienestar integral, construido en React con TypeScript y Chakra UI. Permite a los pacientes ver información de la clínica, servicios, blog, enviar mensajes de contacto y reservar citas en línea. Se conecta con el backend OdontoServer mediante una API REST.

## ¿Qué tecnologías y arquitectura se usan?
- **React + TypeScript**: Para una experiencia de usuario moderna y robusta.
- **Chakra UI**: Componentes accesibles y responsivos.
- **Consumo de API REST**: Comunicación con el backend para todas las operaciones.
- **Autenticación JWT**: Para reservar citas y acceder a funciones protegidas.

## Funcionalidades principales
- **Landing page**: Información general, servicios y blog.
- **Blog**: Sección de artículos y novedades.
- **Servicios**: Listado de servicios ofrecidos por la clínica.
- **Contacto**: Formulario para enviar mensajes a la clínica.
- **Sistema de citas**: Reserva de citas en línea, selección de servicio y horario.
- **Autenticación**: Registro, login y protección de rutas sensibles.

## Endpoints consumidos
- `/api/auth` — Registro y login (JWT)
- `/api/services` — Listado de servicios
- `/api/contacts` — Enviar mensajes de contacto
- `/api/blog` — Listado de posts y banners
- `/api/appointments` — Reservar y listar citas (requiere autenticación)

## Primeros pasos para desarrollo
1. Instala [Node.js 18+](https://nodejs.org/).
2. Clona este repositorio y entra en la carpeta:
   ```bash
   git clone <repo-url>
   cd odonto-clinic-main
   ```
3. Instala dependencias:
   ```bash
   npm install
   ```
4. Crea un archivo `.env` si necesitas personalizar la URL del backend (por defecto usa `/api`).
5. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
6. Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## Consejos
- Usa el backend OdontoServer para que todas las funciones estén disponibles.
- Debes iniciar sesión para reservar citas o ver tus citas.
- El formulario de contacto está disponible para usuarios autenticados.
- Puedes personalizar estilos y textos fácilmente usando Chakra UI y los archivos de datos.

## Recursos útiles
- [Documentación de React](https://es.react.dev/)
- [Documentación de Chakra UI](https://chakra-ui.com/)

---


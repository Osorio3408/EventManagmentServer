# Event Management - Servidor (Backend)

Este proyecto es el servidor (backend) de la aplicación de gestión de eventos. Está construido utilizando Node.js, Express y MySQL para proporcionar una API robusta para la gestión de eventos y la asistencia de los participantes.

## Funcionalidades

- **API de Gestión de Eventos:** Proporciona endpoints para crear, leer, actualizar y eliminar eventos.
- **Registro de Asistencia:** Permite registrar la asistencia de los participantes a los eventos.
- **Integración con Base de Datos MySQL:** Utiliza una base de datos MySQL para almacenar y gestionar la información de eventos y participantes de manera eficiente.

## Instalación y Configuración

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias del proyecto utilizando `npm install`.
3. Configura las variables de entorno necesarias, como la conexión a la base de datos MySQL.
4. Inicia el servidor utilizando `npm start`.

## Endpoints

### Eventos

- `GET /api/eventos`: Obtiene todos los eventos.
- `GET /api/eventos/:id`: Obtiene un evento por su ID.
- `POST /api/eventos`: Crea un nuevo evento.
- `PUT /api/eventos/:id`: Actualiza un evento existente.
- `DELETE /api/eventos/:id`: Elimina un evento existente.

### Asistencia

- `POST /api/asistencia/:eventoId`: Registra la asistencia de un participante a un evento específico.

## Contribución

Las contribuciones a este proyecto son bienvenidas. Si deseas contribuir, por favor crea un issue o envía una solicitud de extracción.

## Contacto

Para cualquier pregunta o sugerencia relacionada con el servidor backend de la aplicación de gestión de eventos, no dudes en ponerte en contacto con nosotros en [yuliamandrey@hotmail.com](mailto:yuliamandrey@hotmail.com).

¡Gracias por tu interés en nuestro proyecto!


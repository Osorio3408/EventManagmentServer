// Importar la conexión a la base de datos
const connection = require("../database/conect");

class Event {
  constructor(
    idEvent,
    titleEvent,
    descriptionEvent,
    createDate,
    statusEvent,
    userId,
    idTypeEvent
  ) {
    this.idEvent = idEvent;
    this.titleEvent = titleEvent;
    this.descriptionEvent = descriptionEvent;
    this.createDate = createDate;
    this.statusEvent = statusEvent;
    this.userId = userId;
    this.idTypeEvent = idTypeEvent;
  }

  // Método para crear un nuevo evento y detalles
  static createEventAndDetails(eventData, callback) {
    // console.log(eventData)
    const {
      eventName,
      eventDescription,
      eventStatus,
      eventUserId,
      eventTypeEventId,
      eventStartDate,
      eventEndDate,
      eventLimit,
    } = eventData;

    // console.log(eventData)

    connection.beginTransaction((err) => {
      if (err) {
        console.error("Error al iniciar la transacción:", err);
        return callback(err, null);
      }

      let eventId;

      connection.query(
        "CALL InsertEventAndDetails (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          eventName,
          eventDescription,
          eventStatus,
          eventUserId,
          eventTypeEventId,
          eventStartDate,
          eventEndDate,
          eventLimit,
        ],
        (error, results, fields) => {
          // console.log(results);
          if (error) {
            console.error("Error al insertar evento y detalles:", error);
            return connection.rollback(() => callback(error, null));
          }
          // console.log(results);
          eventId = results[0][0].eventId;

          connection.commit((err) => {
            if (err) {
              console.error("Error al hacer commit:", err);
              return connection.rollback(() => callback(err, null));
            }
            callback(null, eventId);
          });
        }
      );
    });
  }

  static createEventDetailFromTemplate(
    eventIdParam,
    eventStartDateParam,
    eventEndDateParam,
    eventLimitParam,
    callback
  ) {
    connection.query(
      "CALL CreateEventDetailFromTemplate(?, ?, ?, ?)",
      [eventIdParam, eventStartDateParam, eventEndDateParam, eventLimitParam],
      (error, results, fields) => {
        if (error) {
          console.error(
            "Error al crear el detalle de evento desde la plantilla:",
            error
          );
          return callback(error, null);
        }
        // console.log(results)
        const newEventDetailId = results[0][0].newEventDetailId;
        callback(null, newEventDetailId);
      }
    );
  }

  //Método para obtener todos los eventos con sus detalles
  static getEventAndDetails(eventId, callback) {
    connection.query(
      "CALL GetEventAndDetailsById(?)",
      [eventId],
      (error, results, fields) => {
        if (error) {
          console.error("Error al obtener el evento y detalles:", error);
          return callback(error, null);
        }
        const eventAndDetails = results[0];
        callback(null, eventAndDetails);
      }
    );
  }

  // Métodos para eventos
  static getAllEvents(callback) {
    connection.query("CALL GetEventAndDetails()", (error, results, fields) => {
      if (error) {
        console.error("Error al obtener todos los eventos:", error);
        return callback(error, null);
      }
      const events = results[0];
      callback(null, events);
    });
  }

  static getAllEventsOnly(callback) {
    connection.query("CALL GetAllEvents()", (error, results, fields) => {
      if (error) {
        console.error("Error al obtener todos los eventos:", error);
        return callback(error, null);
      }
      const events = results[0];
      callback(null, events);
    });
  }

  static getEventById(idEvent, callback) {
    connection.query(
      "CALL GetEventById(?)",
      [idEvent],
      (error, results, fields) => {
        if (error) {
          console.error("Error al obtener el evento por ID:", error);
          return callback(error, null);
        }
        const event = results[0][0];
        callback(null, event);
      }
    );
  }

  static updateEvent(idEvent, eventData, callback) {
    const {
      eventName,
      eventDescription,
      eventStatus,
      eventUserId,
      eventTypeEventId,
    } = eventData;
    connection.query(
      "CALL UpdateEvent(?, ?, ?, ?, ?, ?)",
      [
        idEvent,
        eventName,
        eventDescription,
        eventStatus,
        eventUserId,
        eventTypeEventId,
      ],
      (error, results, fields) => {
        if (error) {
          console.error("Error al actualizar el evento:", error);
          return callback(error, null);
        }
        const updatedEvent = results[0][0];
        callback(null, updatedEvent);
      }
    );
  }

  static deleteEvent(idEvent, callback) {
    connection.query(
      "CALL DeleteEvent(?)",
      [idEvent],
      (error, results, fields) => {
        if (error) {
          console.error("Error al eliminar el evento:", error);
          return callback(error, null);
        }
        const message = results[0][0].message;
        callback(null, message);
      }
    );
  }

  // Métodos para detalles de eventos
  static getAllEventDetails(callback) {
    connection.query("CALL GetEventDetails()", (error, results, fields) => {
      if (error) {
        console.error("Error al obtener todos los detalles de eventos:", error);
        return callback(error, null);
      }
      const eventDetails = results[0];
      callback(null, eventDetails);
    });
  }

  static getEventDetailsById(eventDetailId, callback) {
    connection.query(
      "CALL GetEventDetailsById(?)",
      [eventDetailId],
      (error, results, fields) => {
        if (error) {
          console.error(
            "Error al obtener los detalles de eventos por ID:",
            error
          );
          return callback(error, null);
        }
        const eventDetails = results[0][0];
        callback(null, eventDetails);
      }
    );
  }

  // Método estático para obtener los eventos de un usuario con asistencia status 1
  static getUserEventsWithAttendanceStatus1(userId, callback) {
    connection.query(
      "CALL GetUserEventsWithAttendanceStatus1(?)",
      [userId],
      (error, results, fields) => {
        if (error) {
          console.error(
            "Error al obtener los eventos del usuario con asistencia status 1:",
            error
          );
          return callback(error, null);
        }
        const userEvents = results[0];
        callback(null, userEvents);
      }
    );
  }

  // Método para obtener el historial de eventos de un usuario
  static getEventsHistory(userId, callback) {
    connection.query(
      "CALL GetEventsHistory(?)",
      [userId],
      (error, results, fields) => {
        if (error) {
          console.error(
            "Error al obtener el historial de eventos del usuario:",
            error
          );
          return callback(error, null);
        }
        const eventsHistory = results[0];
        callback(null, eventsHistory);
      }
    );
  }

  static updateEvents(eventId, eventDetailId, eventData, callback) {
    const { title, description, startDate, endDate, category, limit } =
      eventData;
    connection.query(
      "CALL EditEvent(?, ?, ?, ?, ?, ?, ?, ?)",
      [
        eventId,
        eventDetailId,
        title,
        description,
        startDate,
        endDate,
        category,
        limit,
      ],
      (error, results, fields) => {
        if (error) {
          console.error("Error al actualizar el evento:", error);
          return callback(error, null);
        }
        console.log(results);
        const updatedEvent = results;
        callback(null, updatedEvent);
      }
    );
  }

  static updateEventDetails(eventDetailId, eventDetailsData, callback) {
    const {
      eventStartDate,
      eventEndDate,
      eventStatus,
      eventUserId,
      eventLimit,
      idEvent,
    } = eventDetailsData;
    connection.query(
      "CALL UpdateEventDetails(?, ?, ?, ?, ?, ?, ?)",
      [
        eventDetailId,
        eventStartDate,
        eventEndDate,
        eventStatus,
        eventUserId,
        eventLimit,
        idEvent,
      ],
      (error, results, fields) => {
        if (error) {
          console.error("Error al actualizar los detalles de eventos:", error);
          return callback(error, null);
        }
        const updatedEventDetails = results[0][0];
        callback(null, updatedEventDetails);
      }
    );
  }

  static deleteEventDetails(eventDetailId, callback) {
    // console.log(eventDetailId);
    connection.query(
      "CALL DeleteEventDetails(?)",
      [eventDetailId],
      (error, results, fields) => {
        // console.log(error);
        // console.log(results);
        // console.log("___________");
        // console.log(fields);
        if (error) {
          console.error("Error al eliminar los detalles de eventos:", error);
          return callback(error, null);
        }
        const message = results.message;
        // console.log(message);
        callback(null, message);
      }
    );
  }
}

module.exports = Event;

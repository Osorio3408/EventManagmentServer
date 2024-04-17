const Event = require("../models/eventModel");

const createEvent = (req, res) => {
  const eventData = req.body;

  Event.createEventAndDetails(eventData, (error, eventId) => {
    if (error) {
      console.error("Error al crear el evento y detalles:", error);
      return res.status(500).json({ error: "Error interno del servidor." });
    }
    res.status(201).json({ message: "Evento creado exitosamente.", eventId });
  });
};

const createEventDetailFromTemplate = (req, res) => {
  const { eventId, eventStartDate, eventEndDate, eventLimit } = req.body;

  Event.createEventDetailFromTemplate(
    eventId,
    eventStartDate,
    eventEndDate,
    eventLimit,
    (error, newEventDetailId) => {
      if (error) {
        console.error(
          "Error al crear el detalle de evento desde la plantilla:",
          error
        );
        return res.status(500).json({ error: "Error interno del servidor." });
      }
      res.status(201).json({
        message: "Detalle de evento creado desde la plantilla exitosamente.",
        newEventDetailId,
      });
    }
  );
};

const getAllEvents = (req, res) => {
  Event.getAllEvents((error, events) => {
    if (error) {
      console.error("Error al obtener todos los eventos:", error);
      return res.status(500).json({ error: "Error interno del servidor." });
    }
    res.status(200).json(events);
  });
};

const getOneEvent = (req, res) => {
  const { idEvent } = req.params;

  Event.getEventAndDetails(idEvent, (error, event) => {
    if (error) {
      console.error("Error al obtener el evento:", error);
      return res.status(500).json({ error: "Error interno del servidor." });
    }
    if (!event) {
      return res.status(404).json({ error: "Evento no encontrado." });
    }
    res.status(200).json(event);
  });
};

const getAllEventsOnly = (req, res) => {
  Event.getAllEventsOnly((error, events) => {
    if (error) {
      console.error("Error al obtener todos los eventos:", error);
      return res.status(500).json({ error: "Error interno del servidor." });
    }
    res.status(200).json(events);
  });
};

const getEventById = (req, res) => {
  const { idEvent } = req.params;

  Event.getEventById(idEvent, (error, event) => {
    if (error) {
      console.error("Error al obtener el evento:", error);
      return res.status(500).json({ error: "Error interno del servidor." });
    }
    if (!event) {
      return res.status(404).json({ error: "Evento no encontrado." });
    }
    res.status(200).json(event);
  });
};

const updateEvent = (req, res) => {
  const { idEvent } = req.params;
  const eventData = req.body;

  Event.updateEvents(idEvent, eventData, (error, updatedEvent) => {
    if (error) {
      console.error("Error al actualizar el evento:", error);
      return res.status(500).json({ error: "Error interno del servidor." });
    }
    if (!updatedEvent) {
      return res.status(404).json({ error: "Evento no encontrado." });
    }
    res
      .status(200)
      .json({ message: "Evento editado correctamente.", updatedEvent });
  });
};

const deleteEvent = (req, res) => {
  const { idEvent } = req.params;

  Event.deleteEvent(idEvent, (error, message) => {
    if (error) {
      console.error("Error al eliminar el evento:", error);
      return res.status(500).json({ error: "Error interno del servidor." });
    }
    res.status(200).json({ message });
  });
};

const getAllEventDetails = (req, res) => {
  Event.getAllEventDetails((error, eventDetails) => {
    if (error) {
      console.error("Error al obtener todos los detalles de eventos:", error);
      return res.status(500).json({ error: "Error interno del servidor." });
    }
    res.status(200).json(eventDetails);
  });
};

const getEventDetailsById = (req, res) => {
  const { eventDetailId } = req.params;

  Event.getEventDetailsById(eventDetailId, (error, eventDetails) => {
    if (error) {
      console.error("Error al obtener los detalles de eventos por ID:", error);
      return res.status(500).json({ error: "Error interno del servidor." });
    }
    if (!eventDetails) {
      return res
        .status(404)
        .json({ error: "Detalles de evento no encontrados." });
    }
    res.status(200).json(eventDetails);
  });
};

const getUserEventsWithAttendanceStatus1 = (req, res) => {
  const userId = req.params.userId;

  Event.getUserEventsWithAttendanceStatus1(userId, (error, events) => {
    if (error) {
      console.error(
        "Error al obtener los eventos del usuario con asistencia status 1:",
        error
      );
      return res.status(500).json({ error: "Error interno del servidor." });
    }
    res.status(200).json(events);
  });
};

const getEventsHistory = (req, res) => {
  const userId = req.params.userId; // Suponiendo que el userId se recibe como parámetro en la URL

  Event.getEventsHistory(userId, (error, eventsHistory) => {
    if (error) {
      console.error(
        "Error al obtener el historial de eventos del usuario:",
        error
      );
      return res
        .status(500)
        .json({
          message: "Error al obtener el historial de eventos del usuario",
        });
    }

    res.status(200).json(eventsHistory);
  });
};

const updateEvents = (req, res) => {
  const { eventId, eventDetailId } = req.params;
  const eventData = req.body;

  Event.updateEvents(
    eventId,
    eventDetailId,
    eventData,
    (error, updatedEvent) => {
      if (error) {
        console.error("Error al actualizar el evento:", error);
        return res.status(500).json({ error: "Error interno del servidor." });
      }

      if (!updatedEvent) {
        return res.status(400).json({
          error: "Evento no encontrado o detalles de evento no encontrados.",
        });
      }
      res.status(200).json({
        message: "Evento y detalles de evento editados correctamente.",
        updatedEvent,
      });
    }
  );
};

const updateEventDetails = (req, res) => {
  const { eventDetailId } = req.params;
  const eventDetailsData = req.body;

  Event.updateEventDetails(
    eventDetailId,
    eventDetailsData,
    (error, updatedEventDetails) => {
      if (error) {
        console.error("Error al actualizar los detalles de eventos:", error);
        return res.status(500).json({ error: "Error interno del servidor." });
      }
      if (!updatedEventDetails) {
        return res
          .status(404)
          .json({ error: "Detalles de evento no encontrados." });
      }
      res.status(200).json({
        message: "Detalles de evento editados correctamente.",
        updatedEventDetails,
      });
    }
  );
};

const deleteEventDetails = (req, res) => {
  const { eventDetailId } = req.params;

  Event.deleteEventDetails(eventDetailId, (error, message) => {
    if (error) {
      console.error("Error al eliminar los detalles de eventos:", error);
      return res.status(500).json({ error: "Error interno del servidor." });
    }
    res
      .status(200)
      .json({ message: "Detalles del evento eliminado correctamente." });
  });
};

module.exports = {
  createEvent,
  createEventDetailFromTemplate,
  getAllEvents,
  getOneEvent,
  getUserEventsWithAttendanceStatus1,
  updateEvents,
  getAllEventsOnly,
  getEventById,
  getEventsHistory,
  updateEvent,
  deleteEvent,
  getAllEventDetails,
  getEventDetailsById,
  updateEventDetails,
  deleteEventDetails,
};

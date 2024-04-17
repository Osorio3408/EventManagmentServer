const express = require("express");
const eventController = require("../controllers/eventController");

const router = express.Router();

// Rutas para eventos
router.post("/events", eventController.createEvent);
router.get("/events", eventController.getAllEvents);
router.get("/events/:idEvent", eventController.getOneEvent);
// router.put("/events/:idEvent", eventController.updateEvent);
router.put("/events/:eventId/:eventDetailId", eventController.updateEvents);
router.delete("/events/:idEvent", eventController.deleteEvent);
router.get("/all-events-only", eventController.getAllEventsOnly);
router.get("/event-by-id/:idEvent", eventController.getEventById);
router.get(
  "/getEventsPending/:userId",
  eventController.getUserEventsWithAttendanceStatus1
);
router.get("/events-history/:userId", eventController.getEventsHistory); // Nueva ruta para obtener historial de eventos


// Rutas para detalles de eventos
router.post(
  "/createDetail",
  eventController.createEventDetailFromTemplate
);

router.get("/event-details", eventController.getAllEventDetails);
router.get(
  "/event-details/:eventDetailId",
  eventController.getEventDetailsById
);
router.put("/event-details/:eventDetailId", eventController.updateEventDetails);
router.delete(
  "/event-details/:eventDetailId",
  eventController.deleteEventDetails
);

module.exports = router;

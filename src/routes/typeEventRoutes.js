// src/routes/userRoutes.js
const express = require("express");
const typeEventController = require("../controllers/typeEventController");

const router = express.Router();

router.post("/typeEvent", typeEventController.createTypeEvent);
router.get("/typeEvents", typeEventController.getAllTypeEvents);
router.get("/typeEvent/:typeEventId", typeEventController.getTypeEventById);
router.put("/updateTypeEvent/:typeEventId", typeEventController.updateTypeEvent);
router.delete("/deleteTypeEvent/:typeEventId", typeEventController.deleteTypeEvent);

module.exports = router;

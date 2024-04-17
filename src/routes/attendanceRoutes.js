const express = require("express");
const attendanceController = require("../controllers/attendanceController");

const router = express.Router();

// Rutas para asistencias
router.post('/attendances', attendanceController.createAttendance);
router.get('/attendances', attendanceController.getAllAttendances);
router.get('/attendances/:attendanceId', attendanceController.getAttendanceById);
router.put('/attendances/:attendanceId', attendanceController.updateAttendance);
router.delete('/attendances/:attendanceId', attendanceController.deleteAttendance);

// Nuevas rutas para usuarios y asistencias
router.get('/attendances/pending/:idDetailEvent', attendanceController.getAttendanceToPending);
router.get('/attendances/finish/:idDetailEvent', attendanceController.getAttendanceToFinish);
router.get('/attendances/event/:idDetailEvent', attendanceController.getAttendanceToEvent);

module.exports = router;

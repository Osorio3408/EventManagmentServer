const Attendance = require("../models/attendanceModel");

// Controlador para crear una nueva asistencia
const createAttendance = (req, res) => {
  const attendanceData = req.body;

  Attendance.createAttendance(attendanceData, (error, newAttendanceId) => {
    console.log(attendanceData)
    if (error) {
      console.error("Error al crear la asistencia:", error);
      return res.status(400).json({ error: "Error interno del servidor, por favor valide los campos y vuelva a intentar. "  });
    }
    res
      .status(201)
      .json({ message: "Asistencia creada exitosamente.", newAttendanceId });
  });
};

// Controlador para obtener todas las asistencias
const getAllAttendances = (req, res) => {
  Attendance.getAllAttendances((error, attendances) => {
    if (error) {
      console.error("Error al obtener todas las asistencias:", error);
      return res.status(500).json({ error: "Error interno del servidor." });
    }
    res.status(200).json(attendances);
  });
};

// Controlador para obtener una asistencia por su ID
const getAttendanceById = (req, res) => {
  const { attendanceId } = req.params;

  Attendance.getAttendanceById(attendanceId, (error, attendance) => {
    if (error) {
      console.error("Error al obtener la asistencia:", error);
      return res.status(500).json({ error: "Error interno del servidor." });
    }
    if (!attendance) {
      return res.status(404).json({ error: "Asistencia no encontrada." });
    }
    res.status(200).json(attendance);
  });
};

// Controlador para actualizar una asistencia por su ID
const updateAttendance = (req, res) => {
  const { attendanceId } = req.params;
  const attendanceData = req.body;

  Attendance.updateAttendance(
    attendanceId,
    attendanceData,
    (error, results) => {
      if (error) {
        console.error("Error al actualizar la asistencia:", error);
        return res.status(500).json({ error: "Error interno del servidor." });
      }
      res
        .status(200)
        .json({ message: "Asistencia actualizada correctamente." });
    }
  );
};

// Controlador para eliminar una asistencia por su ID
const deleteAttendance = (req, res) => {
  const { attendanceId } = req.params;

  Attendance.deleteAttendance(attendanceId, (error, results) => {
    if (error) {
      console.error("Error al eliminar la asistencia:", error);
      return res.status(500).json({ error: "Error interno del servidor." });
    }
    res.status(200).json({ message: "Asistencia eliminada correctamente." });
  });
};

// Controlador para obtener la asistencia pendiente con datos de usuarios
const getAttendanceToPending = (req, res) => {
  const { idDetailEvent } = req.params;
  Attendance.getAttendanceToPending(idDetailEvent, (err, results) => {
    if (err) {
      console.error('Error al obtener la asistencia pendiente:', err);
      return res.status(500).json({ error: 'Error interno del servidor.' });
    }
    res.status(200).json(results);
  });
};

// Controlador para obtener la asistencia finalizada con datos de usuarios
const getAttendanceToFinish = (req, res) => {
  const { idDetailEvent } = req.params;
  Attendance.getAttendanceToFinish(idDetailEvent, (err, results) => {
    if (err) {
      console.error('Error al obtener la asistencia finalizada:', err);
      return res.status(500).json({ error: 'Error interno del servidor.' });
    }
    res.status(200).json(results);
  });
};

// Controlador para obtener toda la asistencia con datos de usuarios
const getAttendanceToEvent = (req, res) => {
  const { idDetailEvent } = req.params;
  Attendance.getAttendanceToEvent(idDetailEvent, (err, results) => {
    if (err) {
      console.error('Error al obtener toda la asistencia:', err);
      return res.status(500).json({ error: 'Error interno del servidor.' });
    }
    res.status(200).json(results);
  });
};


module.exports = {
  createAttendance,
  getAllAttendances,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
  getAttendanceToPending,
  getAttendanceToFinish,
  getAttendanceToEvent,
};

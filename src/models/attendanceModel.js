const connection = require("../database/conect");

class Attendance {
  constructor(
    attendanceId,
    attendanceStatus,
    attendanceEventDetailId,
    attendanceUserId
  ) {
    this.attendanceId = attendanceId;
    this.attendanceStatus = attendanceStatus;
    this.attendanceEventDetailId = attendanceEventDetailId;
    this.attendanceUserId = attendanceUserId;
  }

  static createAttendance(attendanceData, callback) {
    const { attendanceStatus, attendanceEventDetailId, attendanceUserId } =
      attendanceData;

    console.log(attendanceData);

    // Validar que no haya valores nulos o vacíos
    if (
      attendanceStatus === null ||
      attendanceStatus === undefined ||
      attendanceEventDetailId === null ||
      attendanceEventDetailId === undefined ||
      attendanceUserId === null ||
      attendanceUserId === undefined ||
      attendanceStatus === "" ||
      attendanceEventDetailId === "" ||
      attendanceUserId === ""
    ) {
      const error = new Error("Todos los campos son obligatorios.");
      return callback(error, null);
    }

    // Validar que los valores sean numéricos
    if (
      isNaN(attendanceStatus) ||
      isNaN(attendanceEventDetailId) ||
      isNaN(attendanceUserId)
    ) {
      const error = new Error("Los campos deben ser valores numéricos.");
      return callback(error, null);
    }

    // Validar que los valores sean enteros
    if (
      !Number.isInteger(attendanceStatus) ||
      !Number.isInteger(attendanceEventDetailId) ||
      !Number.isInteger(attendanceUserId)
    ) {
      const error = new Error("Los campos deben ser valores enteros.");
      return callback(error, null);
    }

    // Si todas las validaciones pasan, realizar la inserción en la base de datos
    connection.query(
      "CALL InsertAttendance(?, ?, ?)",
      [attendanceStatus, attendanceEventDetailId, attendanceUserId],
      (error, results, fields) => {
        console.log(results);
        if (error) {
          console.error("Error al crear la asistencia:", error);
          return callback(error, null);
        }
        const newAttendanceId = results.newAttendanceId;
        callback(null, newAttendanceId);
      }
    );
  }

  static getAllAttendances(callback) {
    connection.query("CALL GetAllAttendances()", (error, results, fields) => {
      if (error) {
        console.error("Error al obtener todas las asistencias:", error);
        return callback(error, null);
      }
      const attendances = results[0];
      callback(null, attendances);
    });
  }

  static getAttendanceById(attendanceId, callback) {
    connection.query(
      "CALL GetAttendanceById(?)",
      [attendanceId],
      (error, results, fields) => {
        if (error) {
          console.error("Error al obtener la asistencia por ID:", error);
          return callback(error, null);
        }
        const attendance = results[0][0];
        callback(null, attendance);
      }
    );
  }

  static updateAttendance(attendanceId, attendanceData, callback) {
    const { attendanceStatus, attendanceEventDetailId, attendanceUserId } =
      attendanceData;
    connection.query(
      "CALL UpdateAttendance(?, ?, ?, ?)",
      [
        attendanceId,
        attendanceStatus,
        attendanceEventDetailId,
        attendanceUserId,
      ],
      (error, results, fields) => {
        if (error) {
          console.error("Error al actualizar la asistencia:", error);
          return callback(error, null);
        }
        callback(null, results);
      }
    );
  }

  static deleteAttendance(attendanceId, callback) {
    connection.query(
      "CALL DeleteAttendance(?)",
      [attendanceId],
      (error, results, fields) => {
        if (error) {
          console.error("Error al eliminar la asistencia:", error);
          return callback(error, null);
        }
        callback(null, results);
      }
    );
  }

  // Fumción para obterner los datos de la asistencia y usuarios que están pendientes a un solo evento
  static getAttendanceToPending(idDetailEvent, callback) {
    connection.query(
      "CALL GetAttendanceToPending(?)",
      [idDetailEvent],
      (err, results) => {
        if (err) {
          console.error("Error al obtener la asistencia pendiente:", err);
          callback(err, null);
          return;
        }
        callback(null, results[0]);
      }
    );
  }

  // Fumción para obterner los datos de la asistencia y usuarios que confirmaron asistencia a un solo evento
  static getAttendanceToFinish(idDetailEvent, callback) {
    connection.query(
      "CALL GetAttendanceToFinish(?)",
      [idDetailEvent],
      (err, results) => {
        if (err) {
          console.error("Error al obtener la asistencia finalizada:", err);
          callback(err, null);
          return;
        }
        callback(null, results[0]);
      }
    );
  }

  // Fumción para obterner los datos de la asistencia y usuarios a un solo evento
  static getAttendanceToEvent(idDetailEvent, callback) {
    connection.query(
      "CALL GetAttendanceToEvent(?)",
      [idDetailEvent],
      (err, results) => {
        if (err) {
          console.error("Error al obtener toda la asistencia:", err);
          callback(err, null);
          return;
        }
        callback(null, results[0]);
      }
    );
  }
}

module.exports = Attendance;

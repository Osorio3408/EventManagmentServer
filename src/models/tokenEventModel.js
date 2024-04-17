const connection = require("../database/conect");

class Token {
  constructor(tokenId, token, tokenEventDetailId) {
    this.tokenId = tokenId;
    this.token = token;
    this.tokenEventDetailId = tokenEventDetailId;
  }

  // Método estático para insertar un token en la base de datos
  static insertToken(tokenValue, tokenEventDetailId, callback) {
    connection.query(
      "CALL InsertToken(?, ?)",
      [tokenValue, tokenEventDetailId],
      (error, results, fields) => {
        if (error) {
          console.error("Error al insertar el token:", error);
          callback(error, null);
          return;
        }
        callback(null, results);
      }
    );
  }
  // Método estático para obtener el token por eventDetailId
  static getTokenByEventDetailId(eventDetailId, callback) {
    connection.query(
      "CALL GetTokenByEventDetailId(?)",
      [eventDetailId],
      (error, results, fields) => {
        if (error) {
          console.error("Error al obtener el token:", error);
          callback(error, null);
          return;
        }
        if (results.length === 0) {
          callback(null, null);
          return;
        }

        console.log(results[0][0]);
        const { tokenId, token, tokenEventDetailId } = results[0];
        const tokenObj = results[0][0];
        callback(null, tokenObj);
      }
    );
  }

  // Método estático para validar el token y actualizar la asistencia
  static validateTokenAndUpdateAttendance(
    token,
    userId,
    eventDetailId,
    callback
  ) {
    connection.query(
      "CALL ValidateTokenAndUpdateAttendance(?, ?, ?)",
      [token, userId, eventDetailId],
      (error, results, fields) => {
        if (error) {
          console.error(
            "Error al validar el token y actualizar la asistencia:",
            error
          );
          callback(error, null);
          return;
        }
        callback(null, results[0]);
      }
    );
  }
}

module.exports = Token;

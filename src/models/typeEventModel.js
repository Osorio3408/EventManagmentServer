// Importar la conexión a la base de datos
const connection = require("../database/conect");

class TypeEvent {
  constructor(typeEventId, typeEventName) {
    this.typeEventId = typeEventId;
    this.typeEventName = typeEventName;
  }

  // Método para insertar un nuevo tipo de evento en la base de datos
  static create(typeName, callback) {
    connection.query(
      "CALL InsertTypeEvent(?)",
      [typeName],
      (error, results, fields) => {
        if (error) {
          console.error("Error al insertar tipo de evento:", error);
          callback(error, null);
        } else {
          // Se insertó correctamente, se llama al callback con el ID del nuevo tipo de evento
          callback(null, results.insertId);
        }
      }
    );
  }

  // Método para obtener todos los tipos de eventos de la base de datos
  static getAll(callback) {
    connection.query("CALL GetAllTypeEvents()", (error, results, fields) => {
      if (error) {
        console.error("Error al obtener todos los tipos de eventos:", error);
        callback(error, null);
      } else {
        // Se devuelven los resultados al callback
        callback(null, results[0]);
      }
    });
  }

  // Método para obtener un tipo de evento por su ID
  static getById(typeEventId, callback) {
    connection.query(
      "CALL GetOneTypeEvent(?)",
      [typeEventId],
      (error, results, fields) => {
        if (error) {
          console.error("Error al obtener el tipo de evento por ID:", error);
          callback(error, null);
        } else {
          // Se devuelve el resultado al callback
          callback(null, results[0][0]);
        }
      }
    );
  }

  // Método para actualizar un tipo de evento por su ID
  static update(typeEventId, typeName, callback) {
    connection.query(
      "CALL UpdateTypeEvent(?, ?)",
      [typeEventId, typeName],
      (error, results, fields) => {
        if (error) {
          console.error("Error al actualizar el tipo de evento:", error);
          callback(error, null);
        } else {
          // Se devuelve el resultado al callback
          callback(null, results.affectedRows > 0);
        }
      }
    );
  }

  // Método para eliminar un tipo de evento por su ID
  static delete(typeEventId, callback) {
    connection.query(
      "CALL DeleteTypeEvent(?)",
      [typeEventId],
      (error, results, fields) => {
        if (error) {
          console.error("Error al eliminar el tipo de evento:", error);
          callback(error, null);
        } else {
          // Se devuelve el resultado al callback
          callback(null, results.affectedRows > 0);
        }
      }
    );
  }
}

module.exports = TypeEvent;

// Importar la conexión a la base de datos
const connection = require("../database/conect");


class Rol {
  constructor(idRol, nameRol) {
    this.idRol = idRol;
    this.nameRol = nameRol;
  }

  // Método para agregar el rol actual a la base de datos
  create(callback) {
    connection.query(
      "CALL InsertRol(?)",
      [this.nameRol],
      (error, results, fields) => {
        if (error) {
          console.error("Error al insertar el rol:", error);
          return callback(error, null);
        }
        callback(null, this);
      }
    );
  }

  // Método estático para obtener la lista de todos los roles desde la base de datos
  static getAllRoles(callback) {
    connection.query("CALL GetAllRoles()", (error, results, fields) => {
      if (error) {
        console.error("Error al obtener todos los roles:", error);
        return callback(error, null);
      }
      // Convertir los resultados en objetos Rol y devolverlos
      const roles = results[0].map((row) => new Rol(row.rolId, row.rolName));
      callback(null, roles);
    });
  }

  // Método estático para obtener un rol por su ID desde la base de datos
  static getOneRol(idRol, callback) {
    connection.query("CALL GetOneRol(?)", [idRol], (error, results, fields) => {
      if (error) {
        console.error("Error al obtener el rol:", error);
        return callback(error, null);
      }
      // Si se encuentra el rol, devolverlo como un objeto Rol
      if (results[0].length > 0) {
        const row = results[0][0];
        const rol = new Rol(row.rolId, row.rolName);
        callback(null, rol);
      } else {
        // Si no se encuentra el rol, devolver null
        callback(null, null);
      }
    });
  }

  // Método estático para actualizar un rol por su ID en la base de datos
  static updateRol(idRol, updatedRolData, callback) {
    connection.query(
      "CALL UpdateRol(?, ?)",
      [idRol, updatedRolData.nameRol],
      (error, results, fields) => {
        if (error) {
          console.error("Error al actualizar el rol:", error);
          return callback(error, null);
        }
        // Si se actualiza correctamente, devolver el objeto Rol actualizado
        if (results.affectedRows > 0) {
          const updatedRol = new Rol(idRol, updatedRolData.nameRol);
          callback(null, updatedRol);
        } else {
          // Si no se actualiza ningún registro, devolver null
          callback(null, null);
        }
      }
    );
  }

  // Método estático para eliminar un rol por su ID en la base de datos
  static deleteRol(idRol, callback) {
    connection.query("CALL DeleteRol(?)", [idRol], (error, results, fields) => {
      if (error) {
        console.error("Error al eliminar el rol:", error);
        return callback(error, null);
      }
      // Si se elimina correctamente, devolver el objeto Rol eliminado
      if (results.affectedRows > 0) {
        const deletedRol = new Rol(idRol, null);
        callback(null, deletedRol);
      } else {
        // Si no se elimina ningún registro, devolver null
        callback(null, null);
      }
    });
  }
}

module.exports = Rol;

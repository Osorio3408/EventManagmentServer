const connection = require("../database/conect");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

class User {
  // Constructor para inicializar un nuevo objeto de usuario
  constructor(
    idUser,
    idType,
    nameUser,
    emailUser,
    chargeUser,
    areaUser,
    password,
    rolId
  ) {
    this.idUser = idUser;
    this.idType = idType;
    this.nameUser = nameUser;
    this.emailUser = emailUser;
    this.chargeUser = chargeUser;
    this.areaUser = areaUser;
    this.password = password;
    this.rolId = rolId;
  }

  // Método para agregar el usuario actual a la base de datos utilizando el procedimiento almacenado
  create() {
    try {
      // Generar el hash de la contraseña
      const hash = bcrypt.hashSync(this.password, saltRounds);

      // Llamar al procedimiento almacenado InsertUser para insertar el usuario en la base de datos
      connection.query(
        "CALL InsertUser(?, ?, ?, ?, ?, ?, ?,?)",
        [
          this.idUser,
          this.idType,
          this.nameUser,
          this.emailUser,
          this.chargeUser,
          this.areaUser,
          hash, // Se pasa la contraseña encriptada al procedimiento almacenado
          this.rolId,
        ],
        (error, results, fields) => {
          if (error) {
            console.error("Error al insertar usuario:", error);
            return;
          }
          console.log("Usuario insertado correctamente");
        }
      );
    } catch (error) {
      console.error("Error al crear el usuario:", error);
    }
  }
  // Método estático para obtener la lista de todos los usuarios desde la base de datos utilizando el procedimiento almacenado
  static getAllUsers(callback) {
    connection.query("CALL GetAllUsers()", (error, results, fields) => {
      if (error) {
        console.error("Error al obtener todos los usuarios:", error);
        callback(null);
        return;
      }
      callback(results[0]); // La primera fila de resultados contiene los usuarios
    });
  }

  // Método estático para obtener un usuario por su ID desde la base de datos utilizando el procedimiento almacenado
  static getOneUser(idUser, callback) {
    // console.log(idUser);
    connection.query(
      "CALL GetOneUser(?)",
      [idUser],
      (error, results, fields) => {
        if (error) {
          console.error("Error al obtener el usuario:", error);
          callback(null);
          return;
        }
        callback(results[0][0]); // La primera fila de resultados contiene el usuario
      }
    );
  }

  // Método estático para actualizar un usuario por su ID en la base de datos utilizando el procedimiento almacenado
  static updateUser(idUser, updatedUserData, callback) {
    // const hash = bcrypt.hashSync(updatedUserData.password, saltRounds);

    const isBcryptHash = (str) => {
      return /^\$2[ayb]\$[0-9]{2}\$[A-Za-z0-9/.]{53}$/.test(str);
    };

    if (isBcryptHash(updatedUserData.password)) {
      connection.query(
        "CALL UpdateUser(?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          idUser,
          updatedUserData.idType,
          updatedUserData.nameUser,
          updatedUserData.emailUser,
          updatedUserData.chargeUser,
          updatedUserData.areaUser,
          updatedUserData.password,
          updatedUserData.statusUser,
          updatedUserData.rolId,
        ],
        (error, results, fields) => {
          if (error) {
            console.error("Error al actualizar el usuario:", error);
            callback(null);
            return;
          }
          callback(results); // Devuelve el resultado de la operación de actualización
        }
      );
    } else {
      const hash = bcrypt.hashSync(updatedUserData.password, saltRounds);

      connection.query(
        "CALL UpdateUser(?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          idUser,
          updatedUserData.idType,
          updatedUserData.nameUser,
          updatedUserData.emailUser,
          updatedUserData.chargeUser,
          updatedUserData.areaUser,
          hash ? hash : null,
          updatedUserData.statusUser,
          updatedUserData.rolId,
        ],
        (error, results, fields) => {
          if (error) {
            console.error("Error al actualizar el usuario:", error);
            callback(null);
            return;
          }
          callback(results); // Devuelve el resultado de la operación de actualización
        }
      );
    }

    const hash = bcrypt.hashSync(updatedUserData.password, saltRounds);

    console.log(hash);

    console.log(updatedUserData);
  }

  // Método estático para eliminar un usuario por su ID en la base de datos utilizando el procedimiento almacenado
  static deleteUser(idUser, callback) {
    connection.query(
      "CALL DeleteUser(?)",
      [idUser],
      (error, results, fields) => {
        if (error) {
          console.error("Error al eliminar el usuario:", error);
          callback(null);
          return;
        }
        callback(results); // Devuelve el resultado de la operación de eliminación
      }
    );
  }

  // Función para autenticar usuarios
  static authenticate(email, password, callback) {
    try {
      // Obtener la contraseña encriptada almacenada en la base de datos
      connection.query(
        "CALL SearchUser(?)",
        [email],
        (error, results, fields) => {
          if (error) {
            console.error("Error al obtener la contraseña encriptada:", error);
            return callback(error, null);
          }
          if (results[0].length === 0) {
            return callback(null, null); // Usuario no encontrado
          }

          // console.log(results[0][0])

          if (results[0][0].userStatus !== 1) {
            console.log(results[0][0].userStatus);
            console.log("El usuario está deshabilitado!");
            const error = "El usuario no está disponible.";
            return callback(error, null);
          }

          // Obtener la contraseña encriptada almacenada en la base de datos
          const hashedPasswordInDB = results[0][0].userPassword;

          // Comparar la contraseña proporcionada con la contraseña encriptada almacenada en la base de datos
          bcrypt.compare(password, hashedPasswordInDB, (err, result) => {
            if (err) {
              console.error("Error al comparar contraseñas:", err);
              return callback(err, null);
            }

            // Si la comparación es exitosa, el resultado es verdadero (true)
            if (result === true) {
              // Usuario autenticado correctamente
              // Llamar al procedimiento almacenado para obtener los detalles del usuario
              connection.query(
                "CALL GetTokenUser(?)",
                [results[0][0].userId], // Pasar el ID del usuario
                (err, userDetails, fields) => {
                  if (err) {
                    console.error(
                      "Error al obtener detalles del usuario:",
                      err
                    );
                    return callback(err, null);
                  }
                  // Generar el token JWT con los detalles del usuario
                  const tokenPayload = {
                    email,
                    details: userDetails[0],

                    // Otras propiedades necesarias para la sesión
                  };

                  // Generar el token con los datos del usuario y una fecha de expiración
                  const token = jwt.sign(tokenPayload, "secret", {
                    expiresIn: "1h",
                  });

                  // Enviar el token al cliente
                  callback(null, { token });
                }
              );
            } else {
              // Contraseña incorrecta
              callback(null, null);
            }
          });
        }
      );
    } catch (error) {
      console.error("Error al autenticar", error);
    }
  }
}

// Exportar la clase User para su uso en otros archivos
module.exports = User;

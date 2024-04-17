const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const Token = require("../models/tokenEventModel");

const login = (req, res) => {
  const { email, password } = req.body;

  User.authenticate(email, password, (err, user) => {
    if (err) {
      console.error("Error al autenticar usuario:", err);
      res.status(500).json({ error: "Error interno del servidor." });
      return;
    }
    if (!user) {
      res.status(401).json({ error: "Credenciales incorrectas." });
      return;
    } else {
      // Contraseña correcta, enviar respuesta con el usuario
      res.status(200).json({ message: "Inicio de sesión exitoso.", user });
    }
  });
};

const insertToken = (req, res) => {
  const { tokenValue, tokenEventDetailId } = req.body;

  Token.insertToken(tokenValue, tokenEventDetailId, (error, results) => {
    if (error) {
      console.error("Error al insertar el token:", error);
      return res.status(500).json({ error: "Error interno del servidor." });
    }
    res.status(201).json({
      message: "Token insertado correctamente.",
    });
  });
};

const getTokenByEventDetailId = (req, res) => {
  const { eventDetailId } = req.params;
  console.log(eventDetailId);

  Token.getTokenByEventDetailId(eventDetailId, (error, token) => {
    if (error) {
      console.error("Error al obtener el token:", error);
      return res.status(500).json({ error: "Error interno del servidor." });
    }
    if (!token) {
      return res.status(404).json({ error: "No se encontró ningún token." });
    }

    console.log(token);
    res.status(200).json({ token });
  });
};

const validateTokenAndUpdateAttendance = (req, res) => {
  const { token, userId, eventDetailId } = req.body;

  console.log(req.body)

  Token.validateTokenAndUpdateAttendance(
    token,
    userId,
    eventDetailId,
    (error, result) => {
      if (error) {
        console.error(
          "Error al validar el token y actualizar la asistencia:",
          error
        );
        return res.status(500).json({ error: "Error interno del servidor." });
      }
      console.log(result);
      res.status(200).json({ message: result[0].message });
    }
  );
};

module.exports = {
  login,
  insertToken,
  getTokenByEventDetailId,
  validateTokenAndUpdateAttendance,
};

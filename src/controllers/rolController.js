const Rol = require("../models/rolModel");

// Controlador para crear un nuevo rol
const createRol = (req, res) => {
  const { nameRol } = req.body;

  // Validación de campo obligatorio
  if (!nameRol) {
    // Si falta el nombre del rol, devuelve un error 400 (Bad Request)
    res.status(400).json({ error: "El nombre del rol es obligatorio." });
    return;
  }

  // Crear un nuevo rol con los datos proporcionados
  const newRol = new Rol(null, nameRol);

  // Guardar el rol en la base de datos
  newRol.create((error, createdRol) => {
    if (error) {
      // Si hay un error al crear el rol, devuelve un mensaje de error
      res.status(500).json({ error: "Error al crear el rol." });
    } else {
      // Devolver un mensaje de éxito y el rol creado
      res
        .status(201)
        .json({ message: "Rol creado exitosamente.", rol: createdRol });
    }
  });
};

// Controlador para obtener todos los roles
const getAllRoles = (req, res) => {
  // Obtener la lista de todos los roles desde la base de datos
  Rol.getAllRoles((error, roles) => {
    if (error) {
      // Si hay un error al obtener los roles, devuelve un mensaje de error
      res.status(500).json({ error: "Error al obtener los roles." });
    } else {
      // Devolver la lista de roles
      res.status(200).json(roles);
    }
  });
};

// Controlador para obtener un rol por su ID
const getOneRol = (req, res) => {
  // Utiliza req.params para obtener el parámetro de la ruta
  const { idRol } = req.params;

  // Buscar un rol por su ID en la base de datos
  Rol.getOneRol(idRol, (error, rol) => {
    if (error) {
      // Si hay un error al buscar el rol, devuelve un mensaje de error
      res.status(500).json({ error: "Error al obtener el rol." });
    } else if (!rol) {
      // Si no se encuentra el rol, devuelve un mensaje de error
      res.status(404).json({ error: "Rol no encontrado." });
    } else {
      // Devolver el rol encontrado
      res.status(200).json(rol);
    }
  });
};

// Controlador para actualizar un rol por su ID
const updateRol = (req, res) => {
  const { idRol } = req.params;
  const updatedRolData = req.body; // Datos actualizados enviados en el cuerpo de la solicitud

  // Actualizar el rol en la base de datos y obtener los datos actualizados
  Rol.updateRol(idRol, updatedRolData, (error, updatedRol) => {
    if (error) {
      // Si hay un error al actualizar el rol, devuelve un mensaje de error
      res.status(500).json({ error: "Error al actualizar el rol." });
    } else if (!updatedRol) {
      // Si no se encuentra el rol para actualizar, devuelve un mensaje de error
      res.status(404).json({ error: "Rol no encontrado." });
    } else {
      // Devolver un mensaje de éxito y el rol actualizado
      res
        .status(200)
        .json({ message: "Rol editado correctamente.", rol: updatedRol });
    }
  });
};

// Controlador para eliminar un rol por su ID
const deleteRol = (req, res) => {
  const { idRol } = req.params;

  // Eliminar el rol por su ID en la base de datos
  Rol.deleteRol(idRol, (error, deletedRol) => {
    if (error) {
      // Si hay un error al eliminar el rol, devuelve un mensaje de error
      res.status(500).json({ error: "Error al eliminar el rol." });
    } else if (!deletedRol) {
      // Si no se encuentra el rol para eliminar, devuelve un mensaje de error
      res.status(404).json({ error: "Rol no encontrado." });
    } else {
      // Devolver un mensaje de éxito y el rol eliminado
      res
        .status(200)
        .json({ message: "Rol eliminado correctamente.", rol: deletedRol });
    }
  });
};

// Exportar los controladores para su uso en las rutas
module.exports = {
  createRol,
  getAllRoles,
  getOneRol,
  updateRol,
  deleteRol,
};

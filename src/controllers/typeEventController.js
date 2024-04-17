const TypeEvent = require("../models/typeEventModel");

// Controlador para crear un nuevo tipo de evento
const createTypeEvent = (req, res) => {
  const { typeEventName } = req.body;

  // Validación de campos obligatorios
  if (!typeEventName) {
    // Si falta algún campo, devuelve un error 400 (Bad Request)
    return res
      .status(400)
      .json({ error: "El nombre del tipo de evento es obligatorio." });
  }

  // Crear un nuevo tipo de evento con los datos proporcionados
  TypeEvent.create(typeEventName, (error, typeId) => {
    if (error) {
      // Si ocurre un error al crear el tipo de evento, devuelve un error 500 (Internal Server Error)
      return res
        .status(500)
        .json({ error: "Error al crear el tipo de evento." });
    }
    // Devolver un mensaje de éxito y el ID del tipo de evento creado
    res
      .status(201)
      .json({ message: "Tipo de evento creado exitosamente.", typeId });
  });
};

// Controlador para obtener todos los tipos de eventos
const getAllTypeEvents = (req, res) => {
  // Obtener la lista de todos los tipos de eventos
  TypeEvent.getAll((error, typeEvents) => {
    if (error) {
      // Si ocurre un error al obtener los tipos de eventos, devuelve un error 500 (Internal Server Error)
      return res
        .status(500)
        .json({ error: "Error al obtener los tipos de eventos." });
    }
    // Devolver la lista de tipos de eventos
    res.status(200).json(typeEvents);
  });
};

// Controlador para obtener un tipo de evento por su ID
const getTypeEventById = (req, res) => {
  const { typeEventId } = req.params;

  // Obtener el tipo de evento por su ID
  TypeEvent.getById(typeEventId, (error, typeEvent) => {
    if (error) {
      // Si ocurre un error al obtener el tipo de evento, devuelve un error 500 (Internal Server Error)
      return res
        .status(500)
        .json({ error: "Error al obtener el tipo de evento por ID." });
    }
    if (!typeEvent) {
      // Si no se encuentra el tipo de evento, devuelve un error 404 (Not Found)
      return res.status(404).json({ error: "Tipo de evento no encontrado." });
    }
    // Devolver el tipo de evento encontrado
    res.status(200).json(typeEvent);
  });
};

// Controlador para actualizar un tipo de evento por su ID
const updateTypeEvent = (req, res) => {
  const { id } = req.params;
  const { typeEventName } = req.body;

  // Validación de campos obligatorios
  if (!typeEventName) {
    // Si falta algún campo, devuelve un error 400 (Bad Request)
    return res
      .status(400)
      .json({ error: "El nombre del tipo de evento es obligatorio." });
  }

  // Actualizar el tipo de evento por su ID
  TypeEvent.update(id, typeEventName, (error, success) => {
    if (error) {
      // Si ocurre un error al actualizar el tipo de evento, devuelve un error 500 (Internal Server Error)
      return res
        .status(500)
        .json({ error: "Error al actualizar el tipo de evento." });
    }
    if (!success) {
      // Si no se encuentra el tipo de evento para actualizar, devuelve un error 404 (Not Found)
      return res
        .status(404)
        .json({ error: "Tipo de evento no encontrado para actualizar." });
    }
    // Devolver un mensaje de éxito
    res
      .status(200)
      .json({ message: "Tipo de evento actualizado correctamente." });
  });
};

// Controlador para eliminar un tipo de evento por su ID
const deleteTypeEvent = (req, res) => {
  const { id } = req.params;

  // Eliminar el tipo de evento por su ID
  TypeEvent.delete(id, (error, success) => {
    if (error) {
      // Si ocurre un error al eliminar el tipo de evento, devuelve un error 500 (Internal Server Error)
      return res
        .status(500)
        .json({ error: "Error al eliminar el tipo de evento." });
    }
    if (!success) {
      // Si no se encuentra el tipo de evento para eliminar, devuelve un error 404 (Not Found)
      return res
        .status(404)
        .json({ error: "Tipo de evento no encontrado para eliminar." });
    }
    // Devolver un mensaje de éxito
    res
      .status(200)
      .json({ message: "Tipo de evento eliminado correctamente." });
  });
};

// Exportar los controladores para su uso en las rutas
module.exports = {
  createTypeEvent,
  getAllTypeEvents,
  getTypeEventById,
  updateTypeEvent,
  deleteTypeEvent,
};

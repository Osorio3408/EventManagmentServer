const User = require("../models/userModel");

// Controlador para crear un nuevo usuario
const createUser = (req, res) => {
  const { idUser, idType, nameUser, emailUser, chargeUser, areaUser, password, rolId } =
    req.body;

  // Validación de campos obligatorios
  function validarCamposVacios(datos) {
    for (const key in datos) {
      if (datos[key] === undefined || datos[key] === "" || datos[key] === null) {
        return true; // Devuelve true si encuentra algún campo vacío o undefined
      }
    }
    return false; // Devuelve false si no encuentra ningún campo vacío o undefined
  }

  const camposVacios = validarCamposVacios({
    idUser,
    idType,
    nameUser,
    emailUser,
    chargeUser,
    areaUser,
    password,
    rolId,
  });

  if (camposVacios) {
    // Si hay campos vacíos o undefined, devuelve un mensaje de error
    return res
      .status(400)
      .json({ error: "Todos los campos son obligatorios." });
  }

  try {
    // Crear un nuevo usuario con los datos proporcionados

    const newUser = new User(
      idUser,
      idType,
      nameUser,
      emailUser,
      chargeUser,
      areaUser,
      password,
      rolId
    );


    // Guardar el usuario en la base de datos utilizando el método create del modelo
    newUser.create();

    // Devolver un mensaje de éxito
    res.status(201).json({ message: "Usuario creado exitosamente." });
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

// Controlador para obtener todos los usuarios
const getAllUsers = (req, res) => {
  // Llamar al método estático getAllUsers del modelo User
  User.getAllUsers((users) => {
    if (!users) {
      // Si no se pudieron obtener los usuarios, devolver un error 500 (Internal Server Error)
      return res.status(500).json({ error: "Error al obtener los usuarios" });
    }
    // Si se obtuvieron los usuarios correctamente, devolver la lista de usuarios
    res.status(200).json(users);
  });
};

// Controlador para obtener un usuario por su ID
const getOneUser = (req, res) => {
  // Utiliza req.params para obtener el parámetro de la ruta
  const { idUser } = req.params;

  // Buscar un usuario por su ID utilizando el método estático del modelo
  User.getOneUser(idUser, (oneUser) => {
    if (!oneUser) {
      // Si no se encuentra el usuario, devolver un error 404 (Not Found)
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    // Devolver el usuario encontrado
    res.status(200).json(oneUser);
  });
};

// Controlador para actualizar un usuario por su ID
const updateUser = (req, res) => {
  const { idUser } = req.params;
  const updatedUserData = req.body; // Datos actualizados enviados en el cuerpo de la solicitud
  console.log(updatedUserData)

  // Actualizar el usuario por su ID utilizando el método estático del modelo
  User.updateUser(idUser, updatedUserData, (updatedUser) => {
    if (!updatedUser) {
      // Si no se encuentra el usuario, devolver un error 404 (Not Found)
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    // Devolver un mensaje de éxito y los datos actualizados del usuario
    res
      .status(200)
      .json([{ message: "Usuario editado correctamente!" }, updatedUser]);
  });
};

// Controlador para eliminar un usuario por su ID
const deleteUser = (req, res) => {
  const { idUser } = req.params;

  // Eliminar el usuario por su ID utilizando el método estático del modelo
  User.deleteUser(idUser, (deletedUser) => {
    if (!deletedUser) {
      // Si no se encuentra el usuario, devolver un error 404 (Not Found)
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    // Devolver un mensaje de éxito
    res.status(200).json({ message: "Usuario eliminado correctamente!" });
  });
};

// Exportar los controladores para su uso en las rutas
module.exports = {
  createUser,
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
};

// src/routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/user', userController.createUser);
router.get('/users', userController.getAllUsers);
router.get('/user/:idUser', userController.getOneUser);
router.put('/updateUser/:idUser', userController.updateUser);
router.delete('/deleteUser/:idUser', userController.deleteUser);

module.exports = router;
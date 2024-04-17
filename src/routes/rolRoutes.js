// src/routes/userRoutes.js
const express = require("express");
const rolController = require("../controllers/rolController");

const router = express.Router();

router.post("/rol", rolController.createRol);
router.get("/roles", rolController.getAllRoles);
router.get("/rol/:idRol", rolController.getOneRol);
router.put("/updateRol/:idRol", rolController.updateRol);
router.delete("/deleteRol/:idRol", rolController.deleteRol);

module.exports = router;

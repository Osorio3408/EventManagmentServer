const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/login", authController.login);
router.post("/token", authController.insertToken);
router.get("/token/:eventDetailId", authController.getTokenByEventDetailId);
router.post("/tokenConfirm", authController.validateTokenAndUpdateAttendance);

module.exports = router;

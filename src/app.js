// src/app.js
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const rolRoutes = require('./routes/rolRoutes');
const authRoutes = require('./routes/authRoutes');
const typeEventRoutes = require('./routes/typeEventRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const cors = require("cors"); // Importar el paquete cors

const app = express();
app.use(cors());

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', eventRoutes);
app.use('/api', rolRoutes);
app.use('/api', authRoutes);
app.use("/api", typeEventRoutes);
app.use("/api", attendanceRoutes);

module.exports = app;

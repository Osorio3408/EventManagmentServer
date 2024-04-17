const mysql = require("mysql");
const cron = require("node-cron");
const moment = require("moment-timezone");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// Tarea programada para ejecutar cada minuto
cron.schedule("* * * * *", () => {
  try {
    // Obtener la fecha y hora actual en la zona horaria de Colombia
    const now = moment().tz("America/Bogota").format("YYYY-MM-DD HH:mm:ss");

    // Ejecutar el primer procedimiento almacenado para actualizar los eventos en estado 1
    connection.query(
      "CALL UpdateEventsStatusToInProgress(?)",
      [now],
      (err, result) => {
        if (err) {
          console.error("Error al actualizar los eventos en estado 1:", err);
          return;
        }
        console.log(`${result.affectedRows} eventos actualizados a estado 2.`);
      }
    );

    // Ejecutar el segundo procedimiento almacenado para actualizar los eventos en estado 2
    connection.query(
      "CALL UpdateEventsStatusToFinished(?)",
      [now],
      (err, result) => {
        if (err) {
          console.error("Error al actualizar los eventos en estado 2:", err);
          return;
        }
        console.log(`${result.affectedRows} eventos actualizados a estado 3.`);
      }
    );
  } catch (error) {
    console.error("Error en la tarea programada:", error);
  }
});

// Establecer conexión
connection.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
    return;
  }
  console.log("Conexión a la base de datos MySQL establecida correctamente");
});

// Exportar la conexión para poder utilizarla en otros archivos
module.exports = connection;

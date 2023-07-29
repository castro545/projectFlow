// Importamos las dependencias
const fs = require('fs');
const { Pool } = require('pg');

// Configuración de la conexión a la base de datos PostgreSQL
const pool = new Pool({
  user: 'postgres',
  password: 'root',
  host: 'localhost',
  port: 5432,
  database: 'projectFlow',
});

// Nombre del archivo SQL a ejecutar (asegúrate de que el archivo esté en la misma ubicación que este script)
const sqlFile = 'src/utils/projectFlowInit.sql';

// Función para leer el archivo SQL
function readSQLFile(filePath: string): string {
  return fs.readFileSync(filePath, 'utf8');
}

// Función para ejecutar el script SQL
async function executeSQLScript(sqlScript: string): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query(sqlScript);
    // eslint-disable-next-line no-console
    console.log('Script SQL ejecutado correctamente.');
  } catch (err) {
    console.error('Error al ejecutar el script SQL:', err);
  } finally {
    client.release();
    pool.end();
  }
}

// Ejecutamos el script
const sqlScript = readSQLFile(sqlFile);
executeSQLScript(sqlScript).catch(console.error);

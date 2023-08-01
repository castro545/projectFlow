import { Pool } from 'pg';

const user = process.env.USER_DB;
const password = process.env.PASS_DB;
const port = process.env.USER_PORT_DBDB;
const portNumber = port ? +port : 5432;

// Configuración de la conexión a la base de datos PostgreSQL
const pool = new Pool({
  user,
  password,
  host: 'localhost',
  port: portNumber,
  database: 'projectFlow',
});

export { pool };
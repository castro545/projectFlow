import { Pool } from 'pg';

// Configuración de la conexión a la base de datos PostgreSQL
const pool = new Pool({
  user: 'postgres',
  password: 'a123',
  host: 'localhost',
  port: 5432,
  database: 'projectFlow',
});

export { pool };
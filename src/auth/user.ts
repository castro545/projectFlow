import { pool } from '@/src/utils/conn'; // Importa la conexión a la base de datos desde tu archivo anterior.

interface User {
  id: number;
  email: string;
  password: string;
}

export async function getUserByUsername(email: string): Promise<User | null> {
  const query = 'SELECT * FROM users WHERE email = $1';
  const values = [email];

  try {
    const { rows } = await pool.query(query, values);
    return rows[0] || null;
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    return null;
  }
}

export async function createUser(email: string, password: string): Promise<User | null> {
  const query = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *';
  const values = [email, password];

  try {
    const { rows } = await pool.query(query, values);
    return rows[0] || null;
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    return null;
  }
}

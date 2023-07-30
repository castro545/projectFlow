import { pool } from '@/src/utils/conn'; // Importa la conexión a la base de datos desde tu archivo anterior.
import {User} from '@/src/interfaces/User';
import bcrypt from 'bcrypt';


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

export async function createUser(full_name:string,email: string, password: string, role_code:number): Promise<User | null> {
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = 'INSERT INTO users (full_name,email, password,role_code) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [full_name,email, hashedPassword,role_code];

  try {
    const { rows } = await pool.query(query, values);
    return rows[0] || null;
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    return null;
  }
}

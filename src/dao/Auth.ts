import { pool } from '@/src/utils/conn';
import { AuthInterface } from '../interfaces/Auth';
import { UserType } from '../types/UserType';
import bcrypt from 'bcrypt';

export class UserDAO implements AuthInterface {

  async deleteUser(id: string): Promise<Number | null> {

    const query = 'UPDATE users SET state = \'INACTIVE\' WHERE id=$1;';

    const values = [id];

    try {

      const { rowCount } = await pool.query(query, values);
      return rowCount || null;

    } catch (error) {

      console.error('Error updating the user:', error);
      return null;

    }
  }

  async getUserByUsername(email: string): Promise<UserType | null> {

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
  async createUser(full_name: string, email: string, password: string, role_code: number): Promise<UserType | null> {

    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (full_name,email, password,role_code) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [full_name, email, hashedPassword, role_code];

    try {
      const { rows } = await pool.query(query, values);
      return rows[0] || null;
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      return null;
    }
  }
}
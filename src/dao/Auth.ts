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
  async createUser(full_name: string, email: string, password: string): Promise<UserType | null> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'SELECT * FROM public.create_user($1, $2, $3) as user_id';
    const values = [full_name, email, hashedPassword];

    try {
      const { rows } = await pool.query(query, values);
      const user = rows[0];
      if (user) {
        const user_id = user.user_id;
        const createdUser: UserType = {
          user_id,
          error: ''
        };
        return createdUser;
      }
      return null;
    } catch (error: any) {
      if (typeof error === 'object' && error !== null && 'code' in error && error.code === '23505') {
        return { user_id: 0, error: 'The user already exists' };
      } else {
        console.error('Error al crear el usuario:', error);
        return null;
      }
    }
  }
}
import { pool } from '@/src/utils/conn';
import { TaskInterface } from '../interfaces/Task';

export class TaskDAO implements TaskInterface {

  async deleteTaskById(id: string[] | string | undefined): Promise<any> {

    const query = 'DELETE FROM tasks WHERE id = $1 RETURNING *';

    const values = [id];

    try {

      const { rows } = await pool.query(query, values);
      return rows[0] || null;

    } catch (error) {

      console.error('Error updating the task:', error);
      return null;

    }
  }

  async updateTaskById(id: string[] | string | undefined, title: string, description: string): Promise<any> {

    const query = 'UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *';

    const values = [title, description, id];

    try {

      const { rows } = await pool.query(query, values);
      return rows[0] || null;

    } catch (error) {

      console.error('Error updating the task:', error);
      return null;

    }
  }

  async selectTaskById(id: string[] | string | undefined): Promise<any | null> {

    const query = 'SELECT * FROM tasks WHERE id = $1';

    const values = [id];

    try {

      const { rows } = await pool.query(query, values);
      return rows[0] || null;

    } catch (error) {

      console.error('Error in obtaining the task:', error);
      return null;

    }
  }

}

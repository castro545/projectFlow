import { pool } from '@/src/utils/conn';
import { CommentsInterface } from '../interfaces/Comments';

export class CommentsDAO implements CommentsInterface {

  async deleteComment(id: string): Promise<Number | null> {

    const query = 'UPDATE comments SET state = \'INACTIVE\' WHERE id=$1;';

    const values = [id];

    try {

      const { rowCount } = await pool.query(query, values);
      return rowCount || null;

    } catch (error) {

      console.error('Error al crear el Proyecto:', error);
      return null;

    }
  }

}

import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '@/src/utils/conn';

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      try {
        const query = 'SELECT * FROM tasks';
        const response = await pool.query(query);
        return res.json(response.rows);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    case 'POST':
      try {
        const { title, description } = body;

        const query =
          'INSERT INTO tasks(title, description) VALUES ($1, $2) RETURNING *';
        const values = [title, description];

        const response = await pool.query(query, values);

        return res.json(response.rows[0]);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    default:
      return res.status(400).json({ message: 'Method are not supported' });
  }
}

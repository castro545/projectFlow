import type { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '../../utils/conn';

type Data = {
  message: string;
  time: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const response = await pool.query('SELECT NOW()');
  const response = await conn.query("SELECT NOW()");
  console.info(response.rows);

  res.status(200).json({ message: 'Pong!', time: response.rows[0].now });
}

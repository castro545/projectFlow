import { NextApiRequest, NextApiResponse } from 'next';
import { createUser } from '@/src/services/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    method,
    body,
    // query: { id },
  } = req;
  switch (method) {
    case 'POST':
      try {
        const {full_name,email, password,role_code } = body;
        if (!email || !password) {
          return res.status(400).json({ message: 'Email and password are required' });
        }
        const user = await createUser(full_name,email, password,role_code);
        if (user) {
          return res.status(200).json({ user, message: 'User create successfull' });
        } else {
          return res.status(401).json({ message: 'Error create user' });
        }
      } catch (error) {
        return res.status(401).json({ message: 'Invalid ', error });
      }
    default:
      return res.status(405).json({ message: 'Method not allowed' });

  }


}

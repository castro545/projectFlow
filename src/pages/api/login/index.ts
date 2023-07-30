import { NextApiRequest, NextApiResponse } from 'next';
import { login } from '@/src/services/authService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    method,
    body,
    // query: { id },
  } = req;
  switch (method) {
    case 'POST':
      try {
        const { email, password } = body;
        if (!email || !password) {
          return res.status(400).json({ message: 'Email and password are required' });
        }
        const token = await login(email, password);
        if (token) {
          return res.status(200).json({ token, message: 'Login successfull' });
        } else {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
      } catch (error) {
        return res.status(401).json({ message: 'Invalid ', error });
      }
    default:
      return res.status(405).json({ message: 'Method not allowed' });

  }


}

/* eslint-disable no-unused-vars */
import { NextApiRequest, NextApiResponse } from 'next';
import { login } from '@/src/business/Auth';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  // Enum para los errores
  enum ErrorMessages {
    InvalidCredentials = 'Invalid credentials',
    MissingEmailOrPassword = 'Email and password are required',
    InvalidRequest = 'Invalid request',
    Unauthorized = 'Unauthorized',
    InternalServerError = 'Internal server error',
  }

  switch (method) {
    case 'POST':
      try {
        const { email, password } = body;
        if (!email || !password) {
          return res.status(400).json({ message: ErrorMessages.MissingEmailOrPassword });
        }
        const token = await login(email, password);
        if (token) {
          return res.status(200).json({ token, message: 'Login successful' });
        } else {
          return res.status(401).json({ message: ErrorMessages.InvalidCredentials });
        }
      } catch (error) {
        return res.status(500).json({ message: ErrorMessages.InternalServerError, error });
      }
    default:
      return res.status(405).json({ message: ErrorMessages.InvalidRequest });
  }
}

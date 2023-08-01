import { NextApiRequest, NextApiResponse } from 'next';
import { UserDAO } from '@/src/dao/Auth';
import { AuthInterface } from '@/src/interfaces/Auth';

// Creamos una instancia del DAO
const userDAO: AuthInterface = new UserDAO();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    method,
    body,
  } = req;
  switch (method) {
    case 'DELETE':
      try {
        const { id } = body;

        if (!id) {
          return res.status(400).json({ message: 'Id are required' });
        }
        const rowCount = await userDAO.deleteUser(id);

        if (rowCount === null || rowCount === 0) {
          return res.status(404).json({ message: 'User Not Found or Not Updated' });
        } else {
          return res.json({ message: 'User Updated Successfully' });
        }
      } catch (error) {
        return res.status(401).json({ message: 'Invalid ', error });
      }
    default:
      return res.status(405).json({ message: 'Method not allowed' });

  }


}

import { NextApiRequest, NextApiResponse } from 'next';
import { ProjectInterface } from '@/src/interfaces/Project';
import { ProjectDAO } from '@/src/dao/Project';

// Creamos una instancia del DAO
const projectDAO: ProjectInterface = new ProjectDAO();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { id },
  } = req;
  switch (method) {
    case 'GET':
      try {
        const finishd = await projectDAO.finishProject(id);

        res.status(200).json(finishd);
      } catch (error) {
        return res.status(500).json({ message: 'Error deleting project', error });
      }
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

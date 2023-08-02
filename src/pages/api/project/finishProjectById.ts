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
    body,
  } = req;
  switch (method) {
    case 'POST':
      try {
        const { project_id } = body;

        const finishd = await projectDAO.finishProject(project_id);

        if (finishd) {
          return res.status(200).json({ message: 'Project finishd successfully' });
        } else {
          return res.status(404).json({ message: 'Project not found' });
        }
      } catch (error) {
        return res.status(500).json({ message: 'Error deleting project', error });
      }
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

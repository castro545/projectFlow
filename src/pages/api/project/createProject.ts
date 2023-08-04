import { NextApiRequest, NextApiResponse } from 'next';
import { ProjectInterface } from '@/src/interfaces/Project';
import { ProjectDAO } from '@/src/dao/Project';

// Creamos una instancia del DAO
const projectDAO: ProjectInterface = new ProjectDAO();

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    body: { project_id },
  } = req;
  switch (method) {
    case 'POST':
      try {
        const projects = await projectDAO.createProject(project_id);
        return res.status(200).json(projects);
      } catch (error) {
        return res.status(500).json({ message: 'Error fetching projects by user id', error });
      }
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

export default handler;

import { NextApiRequest, NextApiResponse } from 'next';
import { ProjectType } from '@/src/types/Project';
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

        const createProjectType: ProjectType = { ...body };

        const project = await projectDAO.createProject(createProjectType);
        if (project) {
          return res
            .status(200)
            .json({ project, message: 'Project create successfull' });
        } else {
          return res.status(401).json({ message: 'Error create project' });
        }
      } catch (error) {
        return res.status(401).json({ message: 'Invalid ', error });
      }
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

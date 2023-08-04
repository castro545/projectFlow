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

        if(project.create_project_with_contributors === -1) {
          return res
            .status(200)
            .json({ project, message: 'The project already exists' });
        }

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
    case 'GET':
      try {
        const projects = await projectDAO.getAllProjects();

        return res.status(200).json(projects);
      } catch (error) {
        return res.status(500).json({ message: 'Error fetching projects', error });
      }
    case 'PUT':
      try {
        const { project_id } = body;
        const updateProjectType: Partial<ProjectType> = { ...body };

        const updatedProject = await projectDAO.updateProject(project_id, updateProjectType);

        if (updatedProject) {
          return res.status(200).json({ project: updatedProject, message: 'Project updated successfully' });
        } else {
          return res.status(404).json({ message: 'Project not found' });
        }
      } catch (error) {
        return res.status(500).json({ message: 'Error updating project', error });
      }
    case 'DELETE':
      try {
        const { project_id } = body;

        const deleted = await projectDAO.deleteProject(project_id);

        if (deleted) {
          return res.status(200).json({ message: 'Project deleted successfully' });
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

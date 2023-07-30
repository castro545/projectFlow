import { NextApiRequest, NextApiResponse } from 'next';
import { createProject } from '@/src/services/project';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    body,
    // query: { id },
  } = req;
  switch (method) {
    case 'POST':
      try {
        const { owner_code, shared_code, name, description, start_date, end_date } = body;
        const project = await createProject(owner_code, shared_code, name, description, start_date, end_date);
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

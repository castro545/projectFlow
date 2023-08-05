import { TaskDAO } from '@/src/dao/Task';
import { TaskInterface } from '@/src/interfaces/Task';
import { NextApiRequest, NextApiResponse } from 'next';


// Creamos una instancia del DAO
const taskDAO: TaskInterface = new TaskDAO();

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    body: { project_id, colaborator, task_name, task_description, owner_code },
  } = req;
  switch (method) {
    case 'POST':
      try {
        const projects = await taskDAO.createTask( project_id, colaborator, task_name, task_description, owner_code);
        return res.status(200).json(projects);
      } catch (error) {
        return res.status(500).json({ message: 'Error fetching projects by user id', error });
      }
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

export default handler;

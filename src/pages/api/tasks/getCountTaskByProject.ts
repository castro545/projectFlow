import { NextApiRequest, NextApiResponse } from 'next';
import { TaskInterface } from '@/src/interfaces/Task';
import { TaskDAO } from '@/src/dao/Task';
import { CountTaskInfo } from '@/src/types/Task';

// Creamos una instancia del DAO
const taskDAO: TaskInterface = new TaskDAO();

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
        const {project_id } = body;

        const countTasks: CountTaskInfo[] = await taskDAO.fetchCountTaskByProject(project_id);

        if (countTasks) {
          return res.status(200).json(countTasks);
        } else {
          return res.status(404).json({ message: 'Not Tasks to count' });
        }
      } catch (error) {
        return res.status(500).json({ message: 'Error Counting task', error });
      }
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

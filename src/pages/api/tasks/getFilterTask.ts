import { NextApiRequest, NextApiResponse } from 'next';
import { TaskInterface } from '@/src/interfaces/Task';
import { TaskDAO } from '@/src/dao/Task';
import { TaskType } from '@/src/types/Task';

// Creamos una instancia del DAO
const taskDAO: TaskInterface = new TaskDAO();

async function handler(
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
        const { users, project_id, priorities, status } = body;

        const tasks: TaskType[] = await taskDAO.fetchFilterTask(users, project_id, priorities, status);

        if (tasks) {
          return res.status(200).json(tasks);
        } else {
          return res.status(404).json({ message: 'Tasks not found' });
        }
      } catch (error) {
        return res.status(500).json({ message: 'Error Fetching task', error });
      }
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

export default handler;

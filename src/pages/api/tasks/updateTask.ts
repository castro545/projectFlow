import { NextApiRequest, NextApiResponse } from 'next';
import { TaskInterface } from '@/src/interfaces/Task';
import { TaskDAO } from '@/src/dao/Task';

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
        const { task_id, priority_code, status_code, description, updated_by } = body;

        const updateTask: number = await taskDAO.updateTask(task_id, priority_code, status_code, description, updated_by);

        if (updateTask >= 1 ) {
          return res.status(200).json(updateTask);
        } else {
          return res.status(404).json({ message: 'Tasks not updated' });
        }
      } catch (error) {
        return res.status(500).json({ message: 'Error Updating task', error });
      }
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

export default handler;

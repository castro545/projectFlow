import { NextApiRequest, NextApiResponse } from 'next';
import { TaskInterface } from '@/src/interfaces/Task';
import { TaskDAO } from '@/src/dao/Task';
import { CountTaskInfo } from '@/src/types/Task';

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
        const { project_id, user_code } = body;

        const countTasks: CountTaskInfo[] = await taskDAO.fetchCountTaskByProject(user_code, project_id);

        if (countTasks) {
          if (countTasks[0].completed_tasks !== null) {
            return res.status(200).json(countTasks);
          } else {
            const countTaskInfoNull: CountTaskInfo[] = [
              {
                pending_tasks: 0,
                completed_tasks: 0,
                created_by_me: 0
              }
            ];
            return res.status(200).json(countTaskInfoNull);
          }
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

export default handler;
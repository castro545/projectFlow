import { NextApiRequest, NextApiResponse } from 'next';
import { TaskInterface } from '@/src/interfaces/Task';
import { TaskDAO } from '@/src/dao/Task';
import { CountTaskInfo } from '@/src/types/Task';import { validateTokenMiddleware } from '@/src/utils/validateToken';

const loginUrl = '/login';

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
        const {user_code  } = body;

        const countTasks: CountTaskInfo[] = await taskDAO.fetchCountTaskByUser(user_code);

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


//export default validateTokenMiddleware(handler, loginUrl);
export default handler;

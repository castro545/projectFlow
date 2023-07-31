import { NextApiRequest, NextApiResponse } from 'next';
import { TaskDAO } from '@/src/dao/Task';
import { TaskInterface } from '@/src/interfaces/Task';

const taskDAO: TaskInterface = new TaskDAO();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    body,
    query: { id },
  } = req;

  switch (method) {
    case 'GET':
      try {

        const result = await taskDAO.selectTaskById(id);

        if (result.rowCount === null)
          return res.status(404).json({ message: 'Task Not Found' });

        return res.json(result.rows[0]);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    case 'PUT':
      try {
        const { title, description } = body;

        const result = await taskDAO.updateTaskById(id, title, description);
        return res.json(result.rows[0]);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    case 'DELETE':
      try {

        const result = await taskDAO.deleteTaskById(id);

        if (result.rowCount === null)
          return res.status(404).json({ message: 'Task Not Found' });

        return res.json(result.rows[0]);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    default:
      return res.status(400).json({ message: 'Method are not supported' });
  }
};

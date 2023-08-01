import { NextApiRequest, NextApiResponse } from 'next';
import { CommentsDAO } from '@/src/dao/Comments';
import { CommentsInterface } from '@/src/interfaces/Comments';

// Creamos una instancia del DAO
const commentsDAO: CommentsInterface = new CommentsDAO();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    method,
    body,
  } = req;
  switch (method) {
    case 'DELETE':
      try {
        const { id } = body;

        if (!id) {
          return res.status(400).json({ message: 'Id are required' });
        }
        const rowCount = await commentsDAO.deleteComment(id);

        if (rowCount === null || rowCount === 0) {
          return res.status(404).json({ message: 'Comment Not Found or Not Updated' });
        } else {
          return res.json({ message: 'Comment Updated Successfully' });
        }
      } catch (error) {
        return res.status(401).json({ message: 'Invalid ', error });
      }
    default:
      return res.status(405).json({ message: 'Method not allowed' });

  }


}
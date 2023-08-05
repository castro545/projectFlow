import { NextApiRequest, NextApiResponse } from 'next';
import { IChart } from '@/src/interfaces/IChart';
import { ChartDAO } from '@/src/dao/Chart';

// Creamos una instancia del DAO
const chartDAO: IChart = new ChartDAO();

async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const {
      method,
      query: { id },
    } = req;
    switch (method) {
      case 'GET':
        try {
          const chartInfo = await chartDAO.getChartInfoByProject(id);

          if(chartInfo){
            return res.status(200).json(chartInfo);
          }

          return res.status(500).json({ message: 'Error fetching chart by project id' });
        } catch (error) {
          return res.status(500).json({ message: 'Error fetching chart by project id', error });
        }
      default:
        return res.status(405).json({ message: 'Method not allowed' });
    }
  }
  
  export default handler;
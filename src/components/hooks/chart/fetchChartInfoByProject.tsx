import { ChartInfo } from '@/src/types/Chart';
import { useCallback } from 'react';

export function useChartInfoByProject(): (project_id: string | string[] | undefined) => Promise<ChartInfo> {
  const ChartInfoByProject = useCallback(async (project_id: string | string[] | undefined) => {
    try {

      const headers = {
        'Content-Type': 'application/json',
      };

      const response = await fetch(`api/chart/getChartInfoByProject?id=${project_id}`, {
        method: 'GET',
        headers: headers,
      });

      const resp = await response.json();
      return resp;

    } catch (e) {
      console.log('Error -->', e);
    }
  }, []);
  return ChartInfoByProject;
}

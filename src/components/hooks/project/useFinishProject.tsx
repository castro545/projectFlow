import { useCallback } from 'react';

export function useFinishProject(): (project_id: string | string[] | undefined) => Promise<number> {
  const fetchFinishProject = useCallback(async (project_id: string | string[] | undefined) => {
    try {

      const headers = {
        'Content-Type': 'application/json',
      };

      const response = await fetch(`api/project/finishProjectById?id=${project_id}`, {
        method: 'GET',
        headers: headers,
      });
      const resp = await response.json();

      return resp;

    } catch (e) {
      console.log('Error -->', e);
    }
  }, []);
  return fetchFinishProject;
}
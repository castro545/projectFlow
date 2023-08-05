import { UsersFilter } from '@/src/types/Task';
import { useCallback } from 'react';

export function useUserFilter(): (_project_id: number) => Promise<UsersFilter[]> {
  const fetchUserFilter = useCallback(async (project_id: number) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };

      console.log(project_id);

      const response = await fetch('/api/tasks/getUsersFilter', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ project_id }),
      });
      const resp = await response.json();

      console.log(resp);

      if (resp.redirectTo) {
        window.location.href = resp.redirectTo;
        throw new Error('Redirigiendo a otra página...');
      }
      return resp;
    } catch (e) {
      console.log('Error -->', e);
    }
  }, []);
  return fetchUserFilter;
}
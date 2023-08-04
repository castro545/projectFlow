import { ProjectIsAdminInfo } from '@/src/types/Project';
import { useCallback } from 'react';

export function useFetchAdminInfo(): (_body: any) => Promise<ProjectIsAdminInfo | null> {
  const fetchAdminInfo = useCallback(async (body: {
    project_code: number;
  }) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };

      const response = await fetch('/api/project/getProjectInfo', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
      });
      const resp = await response.json();

      if (resp.redirectTo) {
        window.location.href = resp.redirectTo;
        throw new Error('Redirigiendo a otra página...');
      }
      return resp;
    } catch (e) {
      console.log('Error -->', e);
    }
  }, []);
  return fetchAdminInfo;
}
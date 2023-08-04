import { ProjectType } from '@/src/types/Project';
import { useCallback } from 'react';

export function useFetchInfoProject(): (_body: any) => Promise<ProjectType[] | null> {
  const fetchInfoProject = useCallback(async (body: {
    project_code: number;
  }) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };

      const response = await fetch('/api/project/getProject', {
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
  return fetchInfoProject;
}
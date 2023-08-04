import { ProjectType } from '@/src/types/Project';
import { useCallback } from 'react';

export function useProjectByUser(): (_user_id: number) => Promise<ProjectType[]> {
  const fetchProjectByUser = useCallback(async (user_id: number) => {
    try {

      const headers = {
        'Content-Type': 'application/json',
      };

      const response = await fetch(`api/project/getProjectsByUserId?id=${user_id}`, {
        method: 'GET',
        headers: headers,
      });
      const resp = await response.json();

      return resp;

    } catch (e) {
      console.log('Error -->', e);
    }
  }, []);
  return fetchProjectByUser;
}
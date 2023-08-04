import { ProjectType } from '@/src/types/Project';
import { useCallback } from 'react';

export function useCreateProject(): (_body: ProjectType) => Promise<{ project: { create_project_with_contributors: number }, message: string }> {
  const createProject = useCallback(async (body: ProjectType) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };

      const response = await fetch('/api/project', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
      });
      const resp = await response.json();


      return resp;

    } catch (e) {
      console.log('Error -->', e);
    }
  }, []);
  return createProject;
}
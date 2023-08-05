import { useCallback } from 'react';
import { UpdateTask } from '@/src/types/Task';

export function useUpdateTask(): (_updateTask: UpdateTask) => Promise<number> {
  const updateTask = useCallback(async (updateTask: UpdateTask) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };

      const response = await fetch('/api/tasks/updateTask', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(updateTask),
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
  return updateTask;
}
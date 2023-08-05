import { useCallback } from 'react';

export function useDeleteTask(): (_task_id: number) => Promise<number> {
  const deleteTask = useCallback(async (task_id: number) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };

      const response = await fetch('/api/tasks/deleteTask', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ task_id }),
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
  return deleteTask;
}
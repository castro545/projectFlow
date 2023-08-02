import { BodyType, TaskType } from '@/src/types/Task';
import { useCallback } from 'react';

export function useFetchFilterTasks(): (_body: BodyType) => Promise<TaskType[] | undefined> {
  const fetchFilterTask = useCallback(async (body: BodyType) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };

      const response = await fetch('/api/tasks/getFilterTask', {
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
      console.error('Error -->', e);
      throw new Error('Error al obtener los datos de facturación.');
    }
  }, []);
  return fetchFilterTask;
}
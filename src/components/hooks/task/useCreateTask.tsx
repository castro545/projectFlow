import { UsersFilter } from '@/src/types/Task';
import { useCallback } from 'react';

export function useCreateTask(): (_project_id: number, _colaborator: string, _task_name: string, _task_description: string, _owner_code: number) => Promise<{create_task:number}> {
  const createTask = useCallback(async (project_id: number, colaborator: string, task_name: string, task_description: string, owner_code: number) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };

      const response = await fetch('/api/tasks/createTask', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          'project_id': project_id,
          'colaborator': colaborator,
          'task_name': task_name,
          'task_description': task_description,
          'owner_code': owner_code
        }),
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
  return createTask;
}
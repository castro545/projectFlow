import { useCallback } from 'react';

const useGetCountTaskUser = (): ((_body: any) => Promise<any | undefined>) => {
  const fetCountTask = useCallback(async (body: any) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };

      const response = await fetch('/api/tasks/getCountTaskByUser', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
      });

      const resp = await response.json();

      console.log({resp});

      if (resp.redirectTo) {
        window.location.href = resp.redirectTo;
        throw new Error('Redirigiendo a otra página...');
      }
      return resp;
    } catch (e) {
      console.log('Error -->', e);
    }
  }, []);
  return fetCountTask;
};



export default useGetCountTaskUser;

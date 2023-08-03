
import { LoginType } from '@/src/types/Login';
import { useCallback } from 'react';


export function useLogin(): (_reqBody: LoginType) => Promise<any | undefined> {
  const login = useCallback(async (reqBody: LoginType) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(reqBody),
      });
      const loginValidation = await response.json();

      return loginValidation;
    } catch (e) {
      console.error('Error -->', e);
      return null;
    }
  }, []);
  return login;
}

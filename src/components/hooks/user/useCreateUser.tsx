import { CreateUserResponse, CreateUserType } from '@/src/types/Login';
import { useCallback } from 'react';

export function useCreateUser(): (_bodyUser: CreateUserType) => Promise<CreateUserResponse> {
  const createUser = useCallback(async (bodyUser: CreateUserType) => {
    try {

      const headers = {
        'Content-Type': 'application/json',
      };

      const response = await fetch('api/user/createUser', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(bodyUser),
      });
      const resp = await response.json();

      return resp;

    } catch (e) {
      console.log('Error -->', e);
    }
  }, []);
  return createUser;
}

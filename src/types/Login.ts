export type LoginType = {
  email: string;
  password: string;
}

export type InfoUserLogin = {
  user_id?: number;
  full_name?: string;
  email?: string;
  password?: string;
  is_active?: string;
}

export type CreateUserType = {
  full_name: string;
  email: string;
  password: string;
}

export type CreateUserResponse = {
  user: {
    user_id: number;
    error: string;
  },
  message: string;
}
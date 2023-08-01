/* eslint-disable no-unused-vars */
import { UserType } from '../types/UserType';

export interface AuthInterface {
  getUserByUsername(email: string): Promise<UserType | null>;
  createUser(full_name: string, email: string, password: string, role_code: number): Promise<UserType | null>;
  deleteUser(id: string): Promise<Number | null>
}
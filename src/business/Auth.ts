// src/auth/authService.ts
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserDAO } from '@/src/dao/Auth';
import { AuthInterface } from '@/src/interfaces/Auth';
const JWT_SECRET = 'llavesecreta'; // Cambiar esto por una cadena de caracteres segura.

// Creamos una instancia del DAO
const userDAO: AuthInterface = new UserDAO();

export async function login(email: string, password: string): Promise<string | null> {
  const user = await userDAO.getUserByUsername(email);

  if (!user) {
    return null; // Usuario no encontrado.
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password!);
  if (!isPasswordCorrect) {
    return null; // Contraseña incorrecta.
  }
  const token = jwt.sign({ user }, JWT_SECRET.toString(), { expiresIn: '1h' });
  return token;
}

// src/auth/authService.ts
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getUserByUsername } from './user';

const JWT_SECRET = 'llavesecreta'; // Cambiar esto por una cadena de caracteres segura.

export async function login(email: string, password: string): Promise<string | null> {
  const user = await getUserByUsername(email);
  if (!user) {
    return null; // Usuario no encontrado.
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  //const isPasswordCorrect =  password === user.password; // mientras que se implementa bcrypt al crear la contraseña 

  if (!isPasswordCorrect) {
    return null; // Contraseña incorrecta.
  }
  const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: '1h' });
  return token;
}

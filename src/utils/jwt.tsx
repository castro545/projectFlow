import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const SECRET_KEY = 'llavesecreta';
const EXPIRATION_TIME = '1h';

export function createToken(payload: any): string {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRATION_TIME });
}

export function verifyToken(token: any): any {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error: any) {
    if (error instanceof jwt.TokenExpiredError) {
      console.error('El token ha expirado.');
      return null;
    }
    console.error('Error al verificar el token:', error.message);
    throw error;
  }
}

export function renewTokenExpiration(res: any, token: string) {
  res.setHeader('Set-Cookie', serialize('tokenProjectFlow', token, {
    path: '/',
    maxAge: 3600,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  }));
}
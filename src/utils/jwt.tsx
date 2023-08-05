import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import Storage from './storage';

const SECRET_KEY = 'llavesecreta';

export function verifyToken(token: string): any {
  try {
    const decodedToken = jwt.verify(token, SECRET_KEY);
    return decodedToken;
  } catch (error: any) {
    if (error.message.includes('expired')) {
      Storage.setItem(Storage.USER_ID, '');
      Storage.setItem(Storage.FULL_NAME, '');
      Storage.setItem(Storage.EMAIL, '');
      Storage.setItem(Storage.IS_ACTIVE, '');
      return null;
    }
    console.log('Error al verificar el token:', error.message);
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
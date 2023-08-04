import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const SECRET_KEY = 'llavesecreta';

export function verifyToken(token: string): any {
  console.log(token);

  try {
    const decodedToken = jwt.verify(token, SECRET_KEY);
    console.log(decodedToken);
    return decodedToken;
  } catch (error: any) {
    if (error.message.includes('expired')) {
      console.log('El token ha expirado.');
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
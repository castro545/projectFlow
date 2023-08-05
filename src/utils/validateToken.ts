import { NextApiRequest, NextApiResponse } from 'next';

import { parse } from 'cookie';
import { verifyToken } from './jwt';

export function validateTokenMiddleware(
  handler: (_req: NextApiRequest, _res: NextApiResponse<any>, _decodedToken: any) => Promise<void>,
  redirectUrl: string
) {
  return async (req: NextApiRequest, res: NextApiResponse<any>) => {
    try {

      const cookies = parse(req.headers.cookie || '');
      const token = cookies.tokenProjectFlow;

      if (!token) {
        res.status(401).json({ redirectTo: redirectUrl });
        return;
      }

      let decodedToken;
      try {
        decodedToken = verifyToken(token);
      } catch (error: any) {
        res.status(401).end();
        return;
      }

      if (!decodedToken.user_id) {
        res.status(401).end();
        return;
      }

      await handler(req, res, decodedToken);
    } catch (e) {
      console.error(e);
      res.status(500).end();
    }
  };
}
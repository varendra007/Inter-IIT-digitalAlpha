/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { getEnvironmentVariables } from '../environments/env';
export class AuthSetup {
  static async isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const bearerHeader = req.headers.authorization;
    console.log(bearerHeader);

    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      jwt.verify(
        bearerToken,
        getEnvironmentVariables().jwt_secret, // token secret
        (err: any, authdata: any) => {
          console.log(authdata);
          if (err) {
            res.status(403).json({
              status: 'error',
              data: {},
              error: 'user not logged in',
              success: 'user logged in'
            });
          } else next();
        }
      );
    } else {
      res.status(403).json({
        status: 'error',
        data: {},
        error: 'user not logged in',
        success: 'user logged in'
      });
    }
  }
}

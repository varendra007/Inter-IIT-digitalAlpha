/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NextFunction, Request, Response } from 'express';
// Validators are incharge of checking if the fired api request contents are valid or not
// They also improvise the security of the server
export class AuthValidators {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user: any = req.user;
      if (user._id == req.body.id) next();
      else throw new Error('invalid id');
    } catch (error) {
      res.status(400).json({ message: 'invalid request' });
    }
  }
}

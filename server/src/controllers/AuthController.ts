/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response, NextFunction } from 'express';
import { getEnvironmentVariables } from '../environments/env';
import UserDetail from '../models/User/UserAuthDetails';
import { sign } from 'jsonwebtoken';
export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.body.query;
      const user = await UserDetail.findOne(query);
      if (!user) {
        // if user doesnot exists, create new user
        const user = new UserDetail({
          ...req.body.user
        });
        await user.save();
        const token = sign(user.toJSON(), getEnvironmentVariables().jwt_secret);
        const userAuthData = {
          id: user._id,
          name: user.name,
          phone: user.phone
        };
        return res.status(200).json({
          data: {
            user: JSON.stringify(userAuthData),
            token
          },
          sucess: true
        });
      }
      if (user) {
        // if user exists, get user data
        const token = sign(user.toJSON(), getEnvironmentVariables().jwt_secret);
        const userAuthData = {
          id: user._id,
          name: user.name,
          phone: user.phone
        };
        return res.status(200).json({
          data: {
            user: JSON.stringify(userAuthData),
            token
          },
          success: true
        });
      }
    } catch (err) {
      next(err);
    }
  }
}

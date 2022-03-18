import { NextFunction, Request, Response } from 'express';
export declare class AuthValidators {
    static login(req: Request, res: Response, next: NextFunction): Promise<void>;
}

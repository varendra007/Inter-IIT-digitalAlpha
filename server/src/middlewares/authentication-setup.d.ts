import { Request, Response, NextFunction } from 'express';
export declare class AuthSetup {
    static isAuthenticated(req: Request, res: Response, next: NextFunction): Promise<void>;
}

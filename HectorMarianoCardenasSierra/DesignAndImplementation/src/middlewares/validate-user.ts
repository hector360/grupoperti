import {Request, Response, NextFunction} from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';
import jwt from 'jsonwebtoken';

interface UserPayload {
    id: string;
    name: string;
    email: string;
    roleId: string;
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('auth-token');
    if(!token) {
        throw new NotAuthorizedError()
    }

    const payload = jwt.verify(token, process.env.JWT_KEY || 'jwt-secret') as UserPayload;
    
    req.currentUser = payload
    next();
}
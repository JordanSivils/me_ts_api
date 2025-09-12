import * as express from 'express';
import { ClerkUser } from '../interfaces/clerkUser';

declare global {
    namespace Express {
        interface Request {
            user?: ClerkUser
            clerkId?: string
        }
    }
}

export {};
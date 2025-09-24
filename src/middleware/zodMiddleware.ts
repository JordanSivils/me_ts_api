import { NextFunction, Request, Response } from "express";
import { z } from 'zod' 

export const validateBody = <S extends z.ZodTypeAny>(schema: S) => {
    return (req: Request, res: Response, next: NextFunction) => {
            const result = schema.safeParse(req.body);
            if (!result.success) return next(result.error);
            res.locals.body = result.data as z.infer<S>
            next();
    }
}

export const validateParams = <S extends z.ZodTypeAny>(schema: S) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.params);
        if (!result.success) return next(result.error);
        res.locals.params = result.data as z.infer<S>
        next();
    }
}

export const validateQuery = <S extends z.ZodTypeAny>(schema: S) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.query);
        if (!result.success) return next(result.error);
        res.locals.query = result.data as z.infer<S>
        next()
    }
}
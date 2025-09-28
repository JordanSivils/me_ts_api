import { NextFunction, Request, Response } from "express";

export const healthCheck = (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({
            status: 200,
            message: "healthy"
        })
    } catch (error) {
        next(error)
    }
}
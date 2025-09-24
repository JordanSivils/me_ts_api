import { NextFunction, Request, Response } from "express"
import { ApiError } from "./errorClasses"
import { ZodError } from "zod"

export const handleError = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
        res.status(err.status).json({
            ok: err.ok,
            status: err.status,
            reason: err.reason,
            message: err.message,
        })
        return
    }
    
    if (err instanceof ZodError) {
        console.log(err);
        res.status(400).json({
            status: "Validation Error",
              issues: err.issues.map(e => ({
                field: e.path.join("."),
                message: e.message
              }))
        })
        return
    }

    console.error("unhandled error", err)
    res.status(500).json({
        status: "Error",
        message: "something went wrong"
    })
}
import { NextFunction, Request, Response } from "express"
import { ApiError } from "./errorClasses"
import { ZodError } from "zod"
import { Prisma } from "../../db/client/client"

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
        const errors = err.issues.map(e => ({
            ok: false,
            status: 400,
            reason: "Validation Error",
            field: e.path.join("."),
            message: e.message
        }))
        res.status(400).json(
            errors
        )
        return
    }
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(err);
        switch(err.code) {
            case "P2003":
                res.status(400).json({
                    ok: false,
                    status: 400,
                    reason: err.meta?.field_name,
                    message: "Foreign key constraint failed."
                })
            break;

            case "P2025":
                res.status(400).json({
                    ok: false,
                    status: 404,
                    reason: err.meta?.cause,
                    message: "That record could not be found in the Database"
                })
        }
        
    }

    console.error("unhandled error", err)
    res.status(500).json({
        status: "Error",
        message: "something went wrong"
    })
}
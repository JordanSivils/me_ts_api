import { clerkClient, getAuth } from "@clerk/express";
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/error/errorClasses";
import { RequiredRolesOpts, roleToArray } from "./utils/roleArray";

export const clerkUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const  { userId, getToken } = getAuth(req)

    if (!userId) {
        throw new Error("lasjdlfjaks")
    }

    // const user = await clerkClient.users.getUser(userId);

    const auth = getAuth(req)

    
    const token = await getToken()
    // console.log(user.privateMetadata.stripeId);
    console.log(auth)
    console.log(token);
    console.log(userId)
    next();
}

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const auth = getAuth(req)
    console.log("middleware requirAuth() hit")

    if(!auth.isAuthenticated || !auth.userId) {
        return next(new ApiError(401, "NO_AUTH", "Server did not receive authorized user credentials"))
    }
    next()
}

export const requireRoles = (options: RequiredRolesOpts) => {
    const { hasAny, hasAll } = options

    return (req: Request, res: Response, next: NextFunction) => {
        const auth = getAuth(req);

        if (!auth.userId || !auth.sessionId) {
            res.status(401).json({
                ok: false,
                status: 401,
                reason: "NO_AUTH",
                message: "Inadiquate Credentials"
            })
            return
        }

        const roles = roleToArray((auth.sessionClaims?.metadata as { role?: string[] })?.role)

        if (hasAll && hasAll.length > 0) {
            const containsAll = hasAll.every((r) => roles.includes(r));
            if (!containsAll) {
                res.status(403).json({
                    ok: false,
                    status: 403,
                    reason: "FORBIDDEN",
                    message: `Requires all roles: ${hasAll.join(", ")}`
                })
            }
        } 

        if (hasAny && hasAny.length > 0) {
            const containsAny = hasAny.some((r) => roles.includes(r))
            if (!containsAny) {
                res.status(403).json({
                    ok: false,
                    status: 403,
                    reason: "FORBIDDEN",
                    message: `Requires at least one role: ${hasAny.join(", ")}`
                })
            }
        }

        return next();
    }
}


export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
    const auth = getAuth(req)
    const role = (auth.sessionClaims?.metadata as { role?: string})?.role
    
    if (role !== "admin") {
        console.log("something went wrong here")
        res.status(403).json({ error: `Requires admin role` });
        return
    }

    console.log(`role: ${role}`)
    next()
}


import { clerkClient, getAuth } from "@clerk/express";
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/error/errorClasses";

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
        throw new ApiError(401, "NO_AUTH", "Server did not receive authorized user credentials")
    }

    next()
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


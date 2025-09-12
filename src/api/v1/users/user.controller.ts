import { clerkClient } from "@clerk/express";
import { Request, Response } from "express";

export const updateUser = async (req: Request, res: Response) => {
    const { clerkId, role } = req.body;

    if (!clerkId || !role) {
        throw new Error("no id or role...")
    }
    try {
       const data = await clerkClient.users.updateUserMetadata(clerkId, {
        publicMetadata: {
            role: role
        }
    })

    res.status(200).json({ success: true });
    
    } catch (error) {
        res.status(500).send(error)
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        const data = await clerkClient.users.getUserList();

        res.status(200).json(data)
    } catch (error) {
        console.log(error);
    }
}
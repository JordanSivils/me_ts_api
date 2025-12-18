import { clerkClient } from "@clerk/express";
import { NextFunction, Request, Response } from "express";
import { UserBodySchema } from "./types/clerk.types";
import { createUser, deleteMeUser, getAllClerkUsers, getAllMeUsers, getAllMeUsersList, getMeUser, meUserPatch } from "./user.repository";
import { UserListQuerySchema, UserPatchSchema } from "./types/meUserTypes";

export const getClerkUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const meUsers = await getAllMeUsers();
        const clerkIdSet = new Set(meUsers.map(u => u.clerkId));

        const clerkUsers = await getAllClerkUsers();
        const unfound = clerkUsers.data
            .filter(u => !clerkIdSet.has(u.id))
            .map(u => ({
                id: u.id,
                userName: u.username,
                firstName: u.firstName,
                lastName: u.lastName
            }))

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Success",
            clerkData: unfound,
            meData: meUsers
        });


    } catch (error) {
        next(error);
    }
}

export const createUserHandler = async (req: Request, res: Response, next: NextFunction) => {
    const body = UserBodySchema.parse(req.body);
    try {
        const user = await createUser(body);
        res.status(201).json({
            ok: true,
            status: 201,
            message: "Created Successfully",
            data: user
        })
    } catch (error: any) {
        if (error?.code === "P2002") {
            res.status(409).json({
                ok: false,
                status: 409,
                code: "UNIQUE_VIOLATION",
                message: "User Already Exists"
            })
            return
        }
        next(error)
    }
}

export const getMeUserHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const user = await getMeUser(id);
        res.status(200).json({
            ok: true,
            status: 200,
            message: "Success",
            data: user
        })
    } catch (error) {
        next(error)
    }
}

export const meUserPatchHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const  b  = UserPatchSchema.parse(req.body)
    try {
        const user = await meUserPatch(id, b);
        res.status(201).json({
            ok: true,
            status: 201,
            message: "Updated Successfully",
            data: user
        })
    } catch (error) {
        next(error)
    }
}

export const deleteMeUserHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    try {
        const data = await deleteMeUser(id);
        res.status(200).json({
            ok: true,
            statuse: 200,
            message: "Deleted Successfully",
            data: data
        })
    } catch (error) {
        next(error)
    }
} 

export const getAllMeUsersListHandler = async (req: Request, res: Response, next: NextFunction) => {
    const q = UserListQuerySchema.parse(req.query)
    try {
        const data = await getAllMeUsersList(q);
        res.status(200).json({
            ok: true,
            status: 200,
            message: "Success",
            data: data
        })
    } catch (error) {
        next(error)
    }
}
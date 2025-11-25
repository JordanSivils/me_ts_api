import { clerkClient } from "@clerk/express";
import { UserBody } from "./types/clerk.types";
import { UserPatch } from "./types/meUserTypes";
import prisma from "../../../db/prisma";

export const getAllClerkUsers = async () => {
    try {
        const data = await clerkClient.users.getUserList()
        return data
    } catch (error: any) {
        throw new Error(error)
    }
    
}

export const createUser = async (b: UserBody) => {
    return await prisma.user.create({
        data: b
    })
}

export const getAllMeUsers = async () => {
    return await prisma.user.findMany({
        select: {
            id: true,
            clerkId: true,
            firstName: true,
            lastName: true,
            email: true,
            phoneNumber: true
        },
        orderBy: {
            firstName: "asc"
        }
    });
}



export const getMeUser = async (id: string) => {
    return await prisma.user.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            clerkId: true,
            firstName: true,
            lastName: true,
            email: true,
            phoneNumber: true
        }
    })
}

export const meUserPatch = async (id: string, b: UserPatch) => {
    return await prisma.user.update({
        where: {
            id: id
        },
        data: {
            email: b.email,
            phoneNumber: b.phoneNumber
        }
    })
}

export const deleteMeUser = async (id: string) => {
    return await prisma.user.delete({
        where: {id: id}
    })
}
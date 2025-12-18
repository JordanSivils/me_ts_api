import { clerkClient } from "@clerk/express";
import { UserBody } from "./types/clerk.types";
import { UserListQuery, UserPatch } from "./types/meUserTypes";
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

export const getAllMeUsersList = async (q: UserListQuery) => {
    const skip = (q.page - 1) * q.limit

    const [items, total] = await Promise.all([
        prisma.user.findMany({
            take: q.limit,
            skip: skip,
            select: {
                id: true,
                firstName: true,
                lastName: true
            }
        }),
        prisma.user.count()
    ])
    return {
        page: q.page,
        limit: q.limit,
        total,
        totalPages: Math.ceil(total / q.limit),
        previousPage: q.page > 1,
        nextPage: q.page * q.limit < total,
        items
    }
}
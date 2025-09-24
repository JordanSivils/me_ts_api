import { ItemStatus } from "@prisma/client"
import prisma from "../../../services/prisma"
import { ItemQuery } from "./types/itemFields"
import { buildWhere } from "./utils/itemQueryOpts"

export const updateItemSatus = async () => {
    const update = await prisma.item.updateMany({
        where: {
            status: ItemStatus.negative
        },
        data: {
            status: ItemStatus.standard
        }
    })
    return update
}

export const getAllItems = async () => {
    return await prisma.item.findMany({
        skip: 5,
        take: 1,
        where: {
            status: "negative"
        },
        orderBy: {
            createdAt: "desc"
        }
    })
}
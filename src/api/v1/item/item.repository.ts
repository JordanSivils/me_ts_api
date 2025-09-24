
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

export const getAllItems = async (q: ItemQuery) => {
    const where = buildWhere(q)
    return await prisma.item.findMany({
        where,
        take: 5,
        skip: 0,
        orderBy: {
            createdAt: "desc"
        },
        include: {
            suppliers: true
        }
    })
}
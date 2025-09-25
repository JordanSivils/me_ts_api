
import { ItemStatus } from "@prisma/client"
import prisma from "../../../services/prisma"
import { CreateItemBody, ItemQuery } from "./types/itemFields"
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
    const skip = (q.page - 1) * q.limit
    const [items, total] = await Promise.all([
        prisma.item.findMany({
            where,
            take: q.limit,
            skip: skip,
            orderBy: [{
                createdAt: "desc"
            }, {
                id: "desc"
            }],
            include: {
                suppliers: true
            }
        }),
        prisma.item.count({ where })
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

export const createItem = async (b: CreateItemBody) => {
    const supplierId = b.supplierId
    return await prisma.item.create({
        data: {
            sku: b.sku,
            description: b.description,
            available: b.available ,
            manufacturerId: b.manufacturerId,
            ...(supplierId && {suppliers: {
                connect: { id: b.supplierId}
            }}),
            
            categoryId: b.categoryId,
            brandId: b.brandId
        }
    })
}
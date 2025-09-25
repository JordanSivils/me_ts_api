
import { ItemStatus } from "@prisma/client"
import prisma from "../../../services/prisma"
import { CreateItemBody, ItemQuery, PutItemBody } from "./types/itemFields"
import { buildWhere } from "./utils/itemQueryOpts"
import { IdParams } from "../../../sharedSchemas/globalZodSchemas"
import { ApiError } from "../../../utils/error/errorClasses"

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
            ...(supplierId && {
                suppliers: {
                    connect: { 
                        id: b.supplierId
                    }
            }}),
            
            categoryId: b.categoryId,
            brandId: b.brandId
        }
    })
}

export const getItem = async (id: IdParams) => {
    return await prisma.item.findUnique({
        where: id,
        include: {
            suppliers: true
        }
    })
}

export const putItem = async (supId: IdParams, b: PutItemBody) => {
    const suplierClause = b.supplierId === undefined ?
    undefined : b.supplierId ? 
    { set: [{ id: b.supplierId }]} : { set: [] }
    const item =  await prisma.item.update({
        where: supId,
        data: {
            sku: b.sku,
            description: b.description ,
            available: b.available,
            manufacturerId: b.manufacturerId || null,
            brandId: b.brandId || null,
            categoryId: b.categoryId || null,
            ...(suplierClause && { suppliers: suplierClause } )
        }
    })
    
    return item
}
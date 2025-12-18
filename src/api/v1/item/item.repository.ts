
import { CreateItemBody, ItemQuery, NegativeQuery, PatchItemBody, PutItemBody } from "./types/itemFields"
import { buildItemPatch, buildWhere } from "./utils/itemQueryOpts"
import { IdParams } from "../../../sharedSchemas/globalZodSchemas"
import prisma from "../../../db/prisma"
import { ItemStatus } from "../../../db/client/enums"

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
                available: "asc"
            }, {
                id: "desc"
            }],
            include: {
                suppliers: true,
                category: true
            },
        
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

export const getNegativeInventory = async (q: NegativeQuery) => {
    const skip = (q.page - 1) * q.limit;
    const [items, total] = await Promise.all([
        prisma.item.findMany({
            take: q.limit,
            skip: skip,
            where: {
                status: "negative"
            },
            orderBy: {
                available: "asc"
            }
        }),
            prisma.item.count({
                where: {
                    status: "negative"
                }
            })
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
            suppliers: true,
            category: true,
            brand: true
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
            ...(suplierClause && { suppliers: {
                set: b.supplierId.map(id => ({ id }))
            } } )
        }
    })
    
    return item
}

export const patchItem = async (id: IdParams, b: PatchItemBody) => {
    if (b.supplierId !== undefined && b.supplierId.length > 0) {
        const found: { id: string}[] = await prisma.supplier.findMany({
            where: { id: { in: b.supplierId}},
            select: { id: true }
        })
        if (found.length !== b.supplierId.length) {
      const foundSet = new Set(found.map(f => f.id));
      const missing = b.supplierId.filter(x => !foundSet.has(x));
      const err = new Error(`Unknown supplierIds: ${missing.join(", ")}`);
      (err as any).code = "BAD_SUPPLIERS";
      throw err;
    }
    }
    const data = buildItemPatch(b);
    return await prisma.item.update({
        where: id,
        data
    })
}


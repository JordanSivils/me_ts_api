import { Prisma } from "@prisma/client";
import { ItemQuery, PatchItemBody } from "../types/itemFields";

export const buildWhere = (options: ItemQuery): Prisma.ItemWhereInput => {
    return {
        status: options.status,
        categoryId: options.categoryId,
        suppliers: options.supplierId ? { some: { id: options.supplierId }} : undefined,
        manufacturerId: options.manufacturerId,
        brandId: options.brandId,
        ...(options.query && {
            OR: [
                { sku: { contains: options.query, mode: "insensitive" as const}},
                { description: { contains: options.query, mode: "insensitive" as const}}
            ]
        })
    }
}

export const buildItemPatch = (b: PatchItemBody): Prisma.ItemUpdateInput => ({
    ...(b.sku !== undefined ? { sku: b.sku } : {} ),
    ...(b.status !== undefined ? { status: b.status } : {}),
    ...(b.description !== undefined ? { descrioption: b.description} : {} ),
    ...(b.available !== undefined ? { available: b.available} : {} ),
    ...(b.manufacturerId !== undefined ? { manufacturerId: b.manufacturerId} : {} ),
    ...(b.brandId !== undefined ? { brandId: b.brandId} : {} ),
    ...(b.categoryId !== undefined ? { categoryId: b.categoryId} : {} ),
    ...(b.supplierId !== undefined ? {
        suppliers: { set: b.supplierId.map(id => ({ id }))} 
    } : {})
})
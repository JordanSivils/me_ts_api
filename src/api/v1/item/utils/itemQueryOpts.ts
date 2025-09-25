import { Prisma } from "@prisma/client";
import { ItemQuery } from "../types/itemFields";

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
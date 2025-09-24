import { Prisma } from "@prisma/client";
import { ItemQuery } from "../types/itemFields";

export const buildWhere = (options: ItemQuery): Prisma.ItemWhereInput => {
    return {
        status: options.status,
        categoryId: options.categoryId,
        suppliers: options.supplierId ? { some: { id: options.supplierId }} : undefined,
        manufacturerId: options.manufacturerId,
        brandId: options.brandId,
        // ...(options.status && { status: options.status }),
        // ...(options.brandId && { status: options.brandId }),
        // ...(options.manufacturerId && { status: options.manufacturerId }),
        // ...(options.categoryId ? { categoryId: options.categoryId } : {}),
        // ...(options.supplierId ? { suppliers: { some: { id: options.supplierId }} } : {}),
        // ...(options.query && {
        //     OR: [
        //         { sku: { contains: options.query, mode: "insensitive" as const}},
        //         { description: { contains: options.query, mode: "insensitive" as const}}
        //     ]
        // })
    }
}


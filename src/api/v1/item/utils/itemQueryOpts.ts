import { ItemQuery } from "../types/itemFields";

export const buildWhere = (options: ItemQuery) => {
    return {
        ...(options.status && { status: options.status }),
        ...(options.brandId && { status: options.brandId }),
        ...(options.manufacturerId && { status: options.manufacturerId }),
        ...(options.categoryId && { status: options.categoryId }),
        ...(options.supplierId && { suppliers: { some: { id: options.supplierId }} }),
        ...(options.query && {
            OR: [
                { sku: { contains: options.query, mode: "insensitive" as const}},
                { description: { contains: options.query, mode: "insensitive" as const}}
            ]
        })
    }
}


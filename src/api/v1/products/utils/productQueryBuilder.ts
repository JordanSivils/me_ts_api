import { Prisma } from "../../../../db/client/client";
import { ProductQuery } from "../types/productQuery";

export const productQueryBuilder = (q: ProductQuery): Prisma.ItemWhereInput => {
    return {
        status: q.status,
        brand: { name: q.brand },
        suppliers: q.supplier ? { some: { name: q.supplier }} : undefined,
        category: { name: q.category},
        ...(q.search && {
            OR: [
                {description: {
                    contains: q.search, mode: "insensitive"
                }}
            ]
        })
    }
}

// Adjust keys to match *actual* Prisma field names
export const sortFieldMap: Record<ProductQuery["sortby"], keyof Prisma.ItemOrderByWithRelationInput> = {
    available: "available",
    description: "description"
}

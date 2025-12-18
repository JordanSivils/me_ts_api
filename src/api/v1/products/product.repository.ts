import prisma from "../../../db/prisma"
import { ProductQuery } from "./types/productQuery"
import { productQueryBuilder, sortFieldMap } from "./utils/productQueryBuilder"

export const getAllProducts = async (q: ProductQuery) => {
    const where = productQueryBuilder(q)
    // const orderBy = q.sortBy
    const skip = (q.page - 1) * q.limit
    const [items, total] = await Promise.all([
        prisma.item.findMany({
            where,
            take: q.limit,
            skip: skip,
            orderBy: { [sortFieldMap[q.sortby]]: q.sortdir },
            include: {
                suppliers: {
                    select: { name: true}
                },
                category: {
                    select: { 
                        name: true,
                        id: true
                    }
                },
                brand: {
                    select: { name: true}
                }
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
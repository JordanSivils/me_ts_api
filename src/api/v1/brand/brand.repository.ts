import prisma from "../../../db/prisma";
import { BrandQuery } from "./types/brandTypes";

export const getAllBrands = async (q: BrandQuery) => {
    const skip = (q.page - 1) * q.limit

    const [items, total] = await Promise.all([
        prisma.brand.findMany({
            take: q.limit,
            skip: skip,
            select: {
                id: true,
                name: true
            },
            orderBy: {name: "asc"}
        }),
        prisma.brand.count()
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
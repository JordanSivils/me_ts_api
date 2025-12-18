import prisma from "../../../db/prisma";
import { CategoryQuery } from "./types/categoryTypes";

export const getAllCategories = async (q: CategoryQuery) => {
    const skip = (q.page - 1) * q.limit

    const [items, total] = await Promise.all([
        prisma.category.findMany({
            take: q.limit,
            skip: skip,
            select: {
                id: true,
                name: true
            },
            orderBy: { name: "asc"}
        }),
        prisma.category.count()
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
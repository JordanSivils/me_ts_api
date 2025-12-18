import prisma from "../../../db/prisma";
import { ApiError } from "../../../utils/error/errorClasses";
import { SupplierQuery } from "./types/supplierTypes";

export const createSuppliers = async (suppliers : {name: string}[]) => {
    return await prisma.supplier.createMany({
        data: suppliers
    })
}

export const getAllSuppliers = async (q: SupplierQuery) => {
    const skip = (q.page - 1) * q.limit

    const [items, total] = await Promise.all([
        prisma.supplier.findMany({
            where: { name: { contains: q.search, mode: "insensitive"}},
            take: q.limit,
            skip: skip,
            select: {
                id: true,
                name: true,
                _count: { select: { items: true }},
                supplierDetails: { select: { id: true }}
            },
            orderBy: { name: "asc"}
        })
    ,
        prisma.supplier.count()
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
export const getSupplierById = async (id: string) => {
    return await prisma.supplier.findUnique({
        where: { id },
        include: { 
            supplierDetails: { 
                include: {
                    user: true
                } 
            }}
    })
}

export const deleteSupplier = async (id: string) => {
    const supplier = await getSupplierById(id);
    if (!supplier) {
        throw new Error("no supplier found")
    }

    return await prisma.supplier.delete({
        where: { id }
    })
}

export const editSupplier = async (id: string, name:string) => {
    const supplier = await getSupplierById(id);
    if (!supplier) {
        throw new ApiError(404, "NOT_FOUND", "no supplier found")
    }

    return await prisma.supplier.update({
        where: {
            id
        },
        data: {
            name
        }
    })
}
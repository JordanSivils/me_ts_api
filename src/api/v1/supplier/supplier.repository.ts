
import { NotFoundError } from "../../../middleware/error/errorClasses";
import prisma from "../../../services/prisma"

export const createSuppliers = async (suppliers : {name: string}[]) => {
    return await prisma.supplier.createMany({
        data: suppliers
    })
}

export const getAllSuppliers = async () => {
    return await prisma.supplier.findMany();
}

export const getSupplier = async (id: string) => {
    
    return await prisma.supplier.findUnique({
        where: { id },
    })
}

export const deleteSupplier = async (id: string) => {
    const supplier = await getSupplier(id);
    if (!supplier) {
        throw new Error("no supplier found")
    }

    return await prisma.supplier.delete({
        where: { id }
    })
}

export const editSupplier = async (id: string, name:string) => {
    const supplier = await getSupplier(id);
    if (!supplier) {
        throw new NotFoundError("no supplier found")
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
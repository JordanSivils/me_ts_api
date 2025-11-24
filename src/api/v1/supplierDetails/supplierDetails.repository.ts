import prisma from "../../../services/prisma"
import { SupplierDetailsBody, SupplierDetailsPut } from "./types/supplierDetailsSchema"

export const createSupplierDetails = async (b: SupplierDetailsBody) => {
    return await prisma.supplierDetails.create({
        data: b
    })
};

export const updateSupplierDetails = async (id: string, b: SupplierDetailsPut) => {
    return await prisma.supplierDetails.update({
        where: { id },
        data: b
    })
}
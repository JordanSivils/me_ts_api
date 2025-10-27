import prisma from "../../../services/prisma"
import { SupplierDetailsBody } from "./types/supplierDetailsSchema"

export const createSupplierDetails = async (b: SupplierDetailsBody) => {
    return await prisma.supplierDetails.create({
        data: b
    })
};


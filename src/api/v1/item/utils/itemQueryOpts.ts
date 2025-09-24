import { ItemQuery } from "../types/itemFields";

const buildWhere = (options: ItemQuery) => {
    return {
        ...(options.status && { status: options.status }),
        ...(options.brandId && { status: options.brandId }),
        ...(options.manufacturerId && { status: options.manufacturerId }),
        ...(options.categoryId && { status: options.categoryId }),
        ...(options.supplierId && { status: options.supplierId }),
    }
}
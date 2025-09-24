import { ItemStatus } from "@prisma/client"
import prisma from "../../../services/prisma"

export const updateItemSatus = async () => {
    const update = await prisma.item.updateMany({
        where: {
            status: ItemStatus.negative
        },
        data: {
            status: ItemStatus.standard
        }
    })
    return update
}

export const getAllItems = () => {
    
}
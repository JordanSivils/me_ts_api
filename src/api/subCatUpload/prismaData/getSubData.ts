import { prisma } from "../../../middleware/prisma"

export const findSubCategoryByName = async (name:string) => {
  try {
    const data = await prisma.subcategory.findUnique({
      where: {
        name
      }
    })
    return data
  } catch (error) {
    console.error("Couldnt find Subcategory by that name.", error)
  }
}

export const getAllSubCatData = async (month?: number, year?: number) => {
  try {
    const subData = await prisma.subcategory.findMany({
      include: {
        salesData: {
          where: {
            ...(month && { month }),
            ...(year && { year })
          }
        }
      }
    })
    return subData
  } catch (error) {
    console.error("Failed to fetch sub categories", error)
  }
}
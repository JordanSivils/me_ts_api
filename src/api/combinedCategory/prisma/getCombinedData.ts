import { prisma } from "../../../middleware/prisma"
import { sumSalesData } from "../../../utils/aggregateSales";

export const getCombinedCategoryTable = async (month?: number, year?:number) => {
  try {
    const combinedCategories = await prisma.combinedCategory.findMany({
      include: {
        subcategories: {
          include: {
            salesData: {
              where: {
                ...(month && { month }),
                ...(year && {year})
              }
            }
          }
        }
      }
    })

    const combinedCategoryTable = combinedCategories.map((combinedCategory) => {
      const allSalesData = combinedCategory.subcategories.flatMap((subcategory) => subcategory.salesData);

      const aggregatedData = sumSalesData(allSalesData);

      return {
        combinedCategoryName: combinedCategory.name,
        ...aggregatedData
      }
    })
    return combinedCategoryTable
  } catch (error) {
    console.error("Error fetching combined category sales data:", error);
    throw error;
  }
}
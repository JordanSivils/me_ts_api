import { prisma } from "../../../middleware/prisma"
import { sumSalesData } from "../../../utils/aggregateSales";

export const getCategoryTable = async (month?: number, year?: number) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        combinedCategories: {
          include: {
            subcategories: {
              include: {
                salesData: {
                  where: {
                    ...(month && { month }),
                    ...(year && { year })
                  }
                }
              }
            }
          }
        }
      }
    });

    const categoryTable = categories.map((category) => {
      const allSalesData = category.combinedCategories.flatMap((combinedCategory) => combinedCategory.subcategories.flatMap((subcategory) => subcategory.salesData));

      const aggregatedData = sumSalesData(allSalesData);

      return {
        categoryName: category.name,
        ...aggregatedData
      }
    })
    return categoryTable
  } catch (error) {
    
  }
}
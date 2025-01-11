import { SalesData } from "@prisma/client";
import { prisma } from "../../../middleware/prisma";
import { sumSpecificField } from "../utils/aggregateField";

export const getAggregateSalesData = async (
  name: string,
  type: "category" | "combinedCategory",
  field: keyof SalesData,
  startMonth?: number,
  startYear?: number,
  endMonth?: number,
  endYear?: number
) => {
  try {
    let salesData: SalesData[] = [];

    if (type === "category") {
      // Query for Category
      const category = await prisma.category.findUnique({
        where: { name },
        include: {
          combinedCategories: {
            include: {
              subcategories: {
                include: {
                  salesData: {
                    where: {
                      ...(startYear && { year: { gte: startYear } }),
                      ...(endYear && { year: { lte: endYear } }),
                      ...(startMonth && { month: { gte: startMonth } }),
                      ...(endMonth && { month: { lte: endMonth } }),
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!category) {
        throw new Error(`Category "${name}" not found.`);
      }

      // Flatten the sales data
      salesData = category.combinedCategories.flatMap((combinedCategory) =>
        combinedCategory.subcategories.flatMap((subcategory) => subcategory.salesData)
      );
    } else {
      // Query for Combined Category
      const combinedCategory = await prisma.combinedCategory.findUnique({
        where: { name },
        include: {
          subcategories: {
            include: {
              salesData: {
                where: {
                  ...(startYear && { year: { gte: startYear } }),
                  ...(endYear && { year: { lte: endYear } }),
                  ...(startMonth && { month: { gte: startMonth } }),
                  ...(endMonth && { month: { lte: endMonth } }),
                },
              },
            },
          },
        },
      });

      if (!combinedCategory) {
        throw new Error(`Combined Category "${name}" not found.`);
      }

      // Flatten the sales data
      salesData = combinedCategory.subcategories.flatMap((subcategory) => subcategory.salesData);
    }

    // Aggregate the chosen field
    const total = sumSpecificField(salesData, field);

    return { name, type, field, total };
  } catch (error) {
    console.error("Error fetching aggregate sales data:", error);
    throw error;
  }
};

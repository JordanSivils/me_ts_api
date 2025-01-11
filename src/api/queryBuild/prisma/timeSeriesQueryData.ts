import { SalesData } from "@prisma/client";
import { prisma } from "../../../middleware/prisma";

export const getTimeSeriesSalesData = async (
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
    let categoryName = name; // Default to the provided name

    if (type === "category") {
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

      salesData = category.combinedCategories.flatMap((combinedCategory) =>
        combinedCategory.subcategories.flatMap((subcategory) => subcategory.salesData)
      );

      categoryName = category.name;
    } else {
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

      salesData = combinedCategory.subcategories.flatMap((subcategory) => subcategory.salesData);

      categoryName = combinedCategory.name;
    }

    // Group sales data by month/year and sum the specified field
    const groupedData = salesData.reduce((acc, entry) => {
      const key = `${entry.year}-${entry.month}`;
      if (!acc[key]) {
        acc[key] = { categoryName, month: entry.month, year: entry.year, total: 0 };
      }
      acc[key].total += entry[field] as number;
      return acc;
    }, {} as Record<string, { categoryName: string; month: number; year: number; total: number }>);

    // Convert the grouped data into an array
    return Object.values(groupedData);
  } catch (error) {
    console.error("Error fetching time-series sales data:", error);
    throw error;
  }
};

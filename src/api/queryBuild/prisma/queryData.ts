import { prisma } from "../../../middleware/prisma";

export const getSalesData = async (filters: {
  category?: string;
  combinedCategory?: string;
  subcategory?: string;
  startMonth?: number;
  startYear?: number;
  endMonth?: number;
  endYear?: number;
}) => {
  const { category, combinedCategory, subcategory, startMonth, startYear, endMonth, endYear } = filters;

  // Build the date range filter
  const dateFilter = {
    ...(startYear && { year: { gte: startYear } }),
    ...(endYear && { year: { lte: endYear } }),
    ...(startMonth && { month: { gte: startMonth } }),
    ...(endMonth && { month: { lte: endMonth } }),
  };

  // Build the category filter
  const categoryFilter = {
    ...(category && { subcategory: { combinedCategory: { category: { name: category } } } }),
    ...(combinedCategory && { subcategory: { combinedCategory: { name: combinedCategory } } }),
    ...(subcategory && { subcategory: { name: subcategory } }),
  };

  // Query the database
  const salesData = await prisma.salesData.findMany({
    where: {
      ...dateFilter,
      ...categoryFilter,
    },
    include: {
      subcategory: {
        include: {
          combinedCategory: {
            include: {
              category: true,
            },
          },
        },
      },
    },
  });

  return salesData;
};

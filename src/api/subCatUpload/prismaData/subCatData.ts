import { prisma } from "../../../middleware/prisma";
import { findSubCategoryByName } from "./getSubData";

export const createSubCatData = async (data: any) => {
  
  try {
    // Create the sales data entry
    const subCatData = await prisma.salesData.create({
      data: {
        month: data.month,
        year: data.year,
        grossSales: data.grossSales,
        discounts: data.discounts,
        netSales: data.netSales,
        extCosts: data.extCosts,
        profit: data.profit,
        margin: data.margin,
        percentNetSales: data.percentNetSales,
        quantitySold: data.quantitySold,
        subcategoryId: data.subcategoryId,
      },
    });

    
    return subCatData;
  } catch (error) {
    console.error("Error inserting sales data:", error);
  }
};

export const createSubCategory = async (name: string) => {
  try {
    const newSubCat = await prisma.subcategory.create({
      data: {
        name,
        combinedCategoryId: null
      }
    })
    return newSubCat
  } catch (error) {
    console.error("Error creating subcategory:", error);
    return null;
  }
}
import { SalesData } from "@prisma/client";

export const sumSpecificField = (salesData: SalesData[], field: keyof SalesData): number => {
  return salesData.reduce((sum, entry) => sum + (entry[field] as number), 0)
}
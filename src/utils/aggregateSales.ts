import { SalesData } from "@prisma/client";

export const sumSalesData = (salesData: SalesData[]) => {
  const totalGrossSales = salesData.reduce((sum, sales) => sum + sales.grossSales, 0);
  const totalDiscounts = salesData.reduce((sum, sales) => sum + sales.discounts, 0);
  const totalNetSales = salesData.reduce((sum, sales) => sum + sales.netSales, 0);
  const totalExtCosts = salesData.reduce((sum, sales) => sum + sales.extCosts, 0);
  const totalProfit = salesData.reduce((sum, sales) => sum + sales.profit, 0);
  const totalQuantitySold = salesData.reduce((sum, sales) => sum + sales.quantitySold, 0);

  const averageMargin = totalNetSales > 0 ? (totalProfit / totalNetSales) * 100 : 0;

  return {
    totalGrossSales,
    totalDiscounts,
    totalNetSales,
    totalExtCosts,
    totalProfit,
    averageMargin: parseFloat(averageMargin.toFixed(2)),
    totalQuantitySold,
  }
}
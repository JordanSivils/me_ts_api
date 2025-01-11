import { Request, Response } from "express";
import fs from "fs";
import csv from "csv-parser";
import { findSubCategoryByName, getAllSubCatData } from "./prismaData/getSubData";
import { createSubCatData } from "./prismaData/subCatData";

const monthNames: { [key: string]: number } = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

const parsePercentageValue = (value: string): number => {
  if (!value || value.trim() === "-" || isNaN(parseFloat(value))) {
    return 0;
  }
  return parseFloat(value.replace("%", "").trim()) || 0;
};

export const uploadSales = async (req: Request, res: Response) => {
  const data = req.file;

  if (!data) {
    return; ;
  }

  const filePath = data.path;
  const salesData: any[] = [];

  try {
    const stream = fs.createReadStream(filePath);

    stream
      .pipe(csv({ mapHeaders: ({ header }) => header.trim() }))
      .on("data", (row) => {
        const trimmedRow: { [key: string]: any } = {};

    for (const [key, value] of Object.entries(row)) {
      if (typeof value === "string") {
        trimmedRow[key] = value.trim();
      } else {
        trimmedRow[key] = value;
      }
    }

        salesData.push({
          month: monthNames[trimmedRow["Month"]],
          year: parseInt(trimmedRow["Year"]),
          grossSales: parseFloat(trimmedRow["Gross Sales"] || 0),
          discounts: parseFloat(trimmedRow["Discounts"] || 0),
          netSales: parseFloat(trimmedRow["Net Sales"] || 0),
          extCosts: parseFloat(trimmedRow["Ext Costs"] || 0),
          profit: parseFloat(trimmedRow["Profit"] || 0),
          margin: parsePercentageValue(trimmedRow["Margin"]),
          percentNetSales: parsePercentageValue(trimmedRow["% Net Sales"]),
          quantitySold: parseInt(trimmedRow["Qty"] === "-" ? "0" : trimmedRow["Qty"]) || 0,
          subCategoryName: trimmedRow["Category"] ? trimmedRow["Category"].trim() : "",
        });
      })
      .on("end", async () => {
        for (const data of salesData) {
          console.log(`Processing sales data for subcategory: ${data.subCategoryName}`);

          const subCategory = await findSubCategoryByName(data.subCategoryName);

          if (!subCategory) {
            console.error(`Subcategory "${data.subCategoryName}" not found in the database.`);
            continue;
          }

          try {
            await createSubCatData({
              ...data,
              subcategoryId: subCategory.id,
            });
            console.log(`Sales data inserted for subcategory: ${data.subCategoryName}`);
          } catch (error) {
            console.error(`Failed to insert sales data for ${data.subCategoryName}:`, error);
          }
        }

        fs.unlink(filePath, (err) => {
          if (err) console.error("Failed to delete file:", err);
        });

        res.status(200).json({ message: "Sales data uploaded and processed successfully!" });
      })
      .on("error", (error) => {
        console.error("Error processing sales CSV:", error);
        res.status(500).json({ error: "Error processing CSV file" });
      });
  } catch (error) {
    console.error("Error processing sales CSV:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getSubCategories = async (req: Request, res: Response) => {
  try {

    const month = req.query.month ? parseInt(req.query.month as string) : undefined;
    const year = req.query.year ? parseInt(req.query.year as string) : undefined;

    const data = await getAllSubCatData(month, year);
    res.status(200).json(data)
  } catch (error) {
    console.error("Error processing sales CSV:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
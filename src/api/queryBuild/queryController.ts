import { Request, Response } from "express";
import { getSalesData } from "./prisma/queryData";
import { getAggregateSalesData } from "./prisma/aggregateQueryData";
import { SalesData } from "@prisma/client";
import { getTimeSeriesSalesData } from "./prisma/timeSeriesQueryData";

export const fetchSalesData = async (req: Request, res: Response) => {
  try {
    const filters = {
      category: req.query.category as string,
      combinedCategory: req.query.combinedCategory as string,
      subcategory: req.query.subcategory as string,
      startMonth: req.query.startMonth ? parseInt(req.query.startMonth as string) : undefined,
      startYear: req.query.startYear ? parseInt(req.query.startYear as string) : undefined,
      endMonth: req.query.endMonth ? parseInt(req.query.endMonth as string) : undefined,
      endYear: req.query.endYear ? parseInt(req.query.endYear as string) : undefined,
    };

    const data = await getSalesData(filters);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching sales data" });
  }
};

export const fetchAggregateSalesData = async (req: Request, res: Response) => {
  try {
    const { name, type, field, startMonth, startYear, endMonth, endYear } = req.query;

    if (!name || !type || !field) {
      res.status(400).json({ error: "Name, type, and field are required." });
    }

    if (type !== "category" && type !== "combinedCategory") {
      res.status(400).json({ error: "Invalid type. Must be 'category' or 'combinedCategory'." });
    }

    const data = await getAggregateSalesData(
      name as string,
      type as "category" | "combinedCategory",
      field as keyof SalesData,
      startMonth ? parseInt(startMonth as string) : undefined,
      startYear ? parseInt(startYear as string) : undefined,
      endMonth ? parseInt(endMonth as string) : undefined,
      endYear ? parseInt(endYear as string) : undefined
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching aggregate sales data" });
  }
};

export const fetchTimeSeriesSalesData = async (req: Request, res: Response) => {
  try {
    const { name, type, field, startMonth, startYear, endMonth, endYear } = req.query;

    if (!name || !type || !field) {
      res.status(400).json({ error: "Name, type, and field are required." });
    }

    const data = await getTimeSeriesSalesData(
      name as string,
      type as "category" | "combinedCategory",
      field as keyof SalesData,
      startMonth ? parseInt(startMonth as string) : undefined,
      startYear ? parseInt(startYear as string) : undefined,
      endMonth ? parseInt(endMonth as string) : undefined,
      endYear ? parseInt(endYear as string) : undefined
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching time-series sales data" });
  }
};
import { Request, Response } from "express";
import { getCategoryTable } from "./prisma/getCategoryData";

export const fetchCategoryTable = async (req: Request, res: Response) => {
  try {
    const month = req.query.month ? parseInt(req.query.month as string) : undefined;
    const year = req.query.year ? parseInt(req.query.year as string) : undefined;

    // const month = req.query.month ? parseInt(req.query.month as string) : undefined;
    // const year = req.query.year ? parseInt(req.query.year as string) : undefined;

    const data = await getCategoryTable(month, year);
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: "Error fetching category table data" });
  }
}
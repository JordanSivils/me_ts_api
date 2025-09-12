import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../../middleware/error/errorClasses";
import * as XLSX from "xlsx"
import {  mapToInventory, readWorkbook } from "./utils/excelToJson";
import { makeInventoryPdf } from "./utils/renderEJS";

export const converExcelToPdf = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const buffer = req.file?.buffer
        if (!buffer) {
            throw new ApiError("no File found", 400)
        }

        const raw = readWorkbook(buffer)
        const rows = mapToInventory(raw);
        const title = "Inventory"
        

        const pdf = await makeInventoryPdf(rows, title);
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", 'attachment; filename="inventory.pdf"');
        res.send(pdf);
        return
        
    } catch (error) {
        if (res.headersSent) {
      console.error("Error after headers sent:", error);
      return;
    }
        next(error);
    }
}
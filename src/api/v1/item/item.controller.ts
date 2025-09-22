import { Request, Response } from "express";
import { ApiError } from "../../../middleware/error/errorClasses";
import * as XLSX from "xlsx"
import { buffer } from "stream/consumers";
import { excelToCsv } from "../../../utils/excel/excelToCsv";
import { csvToJson } from "./utils/csvToJson";
import { clearCache } from "./utils/cacheFk";

export const uploadProducts = async (req: Request, res: Response) => {
    const file = req.file as Express.Multer.File | undefined

    if (!file) {
        throw new ApiError("expected a file", 400)
    }
    const { originalname, mimetype, buffer } = file
    try {
       const data = excelToCsv(buffer)

       const csvParse = await csvToJson(data)
       
       // this is where i want to start to parse via csv function using data as the input.
       res.status(200).json(csvParse)
        
    } catch (error) {
        console.error(error)
    } finally {
        clearCache();
    }
}
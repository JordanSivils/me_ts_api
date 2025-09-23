import { Request, Response } from "express";
import { ApiError } from "../../../middleware/error/errorClasses";
import { excelToCsv } from "../../../utils/excel/excelToCsv";
import { csvToJson } from "./utils/csvToJson";

type Summary = {
    processed: number
    created: number
    updated: number
    errors: number
}

export const uploadProducts = async (req: Request, res: Response) => {
    const file = req.file as Express.Multer.File | undefined

    if (!file) {
        throw new ApiError(400, "FILE_REQUIRED", "expected a file")
    }
    
    const { originalname, mimetype, buffer } = file
    try {
       const data = excelToCsv(buffer)

       const csvParse = await csvToJson(data)
       
       // this is where i want to start to parse via csv function using data as the input.
       res.status(201).json({
        ok: true,
        message: "File Processed Successfully",
       })
        
    } catch (error) {
        console.error(error)
    }
}
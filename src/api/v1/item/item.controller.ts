import { Request, Response } from "express";
import { ApiError } from "../../../utils/error/errorClasses";
import { excelToCsv } from "../../../utils/excel/converExcel";
import { itemUploadHandler } from "./utils/csvToJson";

export const uploadProducts = async (req: Request, res: Response) => {
    const file = req.file as Express.Multer.File | undefined

    if (!file) {
        throw new ApiError(400, "FILE_REQUIRED", "expected a file")
    }
    
    const { originalname, mimetype, buffer } = file
    try {
        const data = excelToCsv(buffer)

        const handleCsv = await itemUploadHandler(data)

        res.status(201).json({
            ok: true,
            message: "File Processed Successfully",
        })
        
    } catch (error) {
        console.error(error)
    }
}
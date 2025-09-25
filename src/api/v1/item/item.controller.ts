import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../../utils/error/errorClasses";
import { excelToCsv } from "../../../utils/excel/converExcel";
import { itemUploadHandler } from "./utils/csvToJson";
import { CreateItemBody, ItemQuery, StatusQuery } from "./types/itemFields";
import { createItem, getAllItems } from "./item.repository";

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

export const getAllItemsHandler = async (req: Request, res: Response, next: NextFunction) => {
    const query = ItemQuery.parse(req.query)
   
    try {
        const items = await getAllItems(query);
        
        res.status(200).json({
        ok: true,
        status: 200,
        message: "Success",
        data: items
    })
    } catch (error) {
        next(error)
    }
}

export const createItemHandler = async (req: Request, res: Response, next: NextFunction) => {
    const body = CreateItemBody.parse(req.body);
    try {
        const item = await createItem(body);

        res.json({
            ok: true,
            status: 201,
            message: "Created Successfully"
        })
    } catch (error) {
        next(error)
    }

}
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../../utils/error/errorClasses";
import { excelToCsv } from "../../../utils/excel/converExcel";
import { itemUploadHandler } from "./utils/csvToJson";
import { CreateItemBody, ItemQuery, NegativeQuery, PatchItemBody, PutItemBody, StatusQuery } from "./types/itemFields";
import { createItem, getAllItems, getItem, getNegativeInventory, patchItem, putItem } from "./item.repository";
import { IdParams } from "../../../sharedSchemas/globalZodSchemas";

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
            message: "Created Successfully",
            data: item
        })
    } catch (error) {
        next(error)
    }
}

export const getItemHandler = async (req: Request, res: Response, next: NextFunction) => {
    const params = IdParams.parse(req.params);
    try {
        const item = await getItem(params);
        if (!item) throw new ApiError(404, "NOT_FOUND", "Id Not Found.")
        res.status(200).json({
            ok: true,
            status: 200,
            message: "Success",
            data: item
        })
    } catch (error) {
        next(error)
    }
}

export const putItemHandler = async (req: Request, res: Response, next: NextFunction) => {
    const id = IdParams.parse(req.params);
    const body = PutItemBody.parse(req.body);
    try {
        const item = await putItem(id, body)

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Updated Successfully",
            data: item
        })
    } catch (error) {
        next(error)
    }
}

export const patchItemHandler = async (req: Request, res: Response, next: NextFunction) => {
    const id = IdParams.parse(req.params);
    const body = PatchItemBody.parse(req.body);
    try {
        const item = await patchItem(id, body)

        res.json({
            ok: true,
            status: 200,
            message: "Updated Successfully",
            data: item
        })
    } catch (error) {
        next(error)
    }
}

export const getNegativeInventoryHandler = async (req: Request, res: Response, next: NextFunction) => {
    const q = NegativeQuery.parse(req.query)
    try {
        const data = await getNegativeInventory(q);

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Success",
            data: data
        })
    } catch (error) {
        next(error)
    }
}
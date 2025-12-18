import { NextFunction, Request, Response } from "express";
import { CategoryQuerySchema } from "./types/categoryTypes";
import { getAllCategories } from "./category.repository";

export const getAllCategoriesHandler = async (req: Request, res: Response, next: NextFunction) => {
    const q = CategoryQuerySchema.parse(req.query)
    try {
        const data = await getAllCategories(q);

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
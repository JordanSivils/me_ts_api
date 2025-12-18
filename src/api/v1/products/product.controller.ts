import { NextFunction, Request, Response } from "express";
import { ProductQuerySchema } from "./types/productQuery";
import { getAllProducts } from "./product.repository";

export const getAllProductsHandler = async (req: Request, res: Response, next: NextFunction) => {
    const q = ProductQuerySchema.parse(req.query);

    try {
        const data = await getAllProducts(q);
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
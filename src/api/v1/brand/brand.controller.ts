import { NextFunction, Request, Response } from "express";
import { BrandQuery } from "./types/brandTypes";
import { getAllBrands } from "./brand.repository";

export const getAllBrandsHandler = async (req: Request, res: Response, next: NextFunction) => {
    const q = BrandQuery.parse(req.query)
    try {
        const data = await getAllBrands(q);
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
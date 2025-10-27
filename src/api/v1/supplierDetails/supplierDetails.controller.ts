import { NextFunction, Request, Response } from "express";
import { SupplierDetailsBodySchema } from "./types/supplierDetailsSchema";
import { createSupplierDetails } from "./supplierDetails.repository";

export const createSupplierDetailsHandler = async (req: Request, res: Response, next: NextFunction) => {
    const b = SupplierDetailsBodySchema.parse(req.body);
    try {
        const data = await createSupplierDetails(b);
        res.status(201).json({
            ok: true,
            status: 201,
            message: "Success",
            data: data
        })
    } catch (error) {
        next(error);
    }
}
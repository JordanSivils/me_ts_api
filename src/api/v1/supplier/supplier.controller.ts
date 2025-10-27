import { NextFunction, Request, Response } from "express";
import { createSuppliers, deleteSupplier, editSupplier, getAllSuppliers, getSupplierById } from "./supplier.repository";
import { ApiError } from "../../../utils/error/errorClasses";
import { SupplierQuery } from "./types/supplierTypes";

export const createSupplierHandler = async (req: Request, res: Response) => {
    const suppliers = req.body;
    
    try {
        const respnose = await createSuppliers(suppliers);

        res.status(200).json(respnose)
    } catch (error) {
        console.log(error)
    }
}

export const getAllSuppliersHandler = async (req: Request, res: Response, next: NextFunction) => {
    const q = SupplierQuery.parse(req.query)
    try {
        const data = await getAllSuppliers(q);
        // console.log(req.headers.authorization)
        res.status(200).json({
            ok: true,
            status: 200,
            message: "Success",
            data: data
        });
    } catch (error) {
        next(error)
    }
}

export const getSupplierHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    try {
        const supplier = await getSupplierById(id)

        if (!supplier) {
            throw new ApiError(404, "NOT_FOUND" , "no supplier with this id" )
        }
        res.status(200).json({
            ok: true,
            status: 200,
            message: "Success",
            data: supplier
        })
    } catch (error) {
        next(error)
    }
}

export const deleteSupplierHandler = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const supplier = await deleteSupplier(id);
        res.status(200).json(supplier)
    } catch (error) {
        console.error(error)
    }
}

export const editSupplierHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body
    try {
        const supplier = await editSupplier(id, name)

        res.status(200).json(supplier)
    } catch (error) {
        console.error(error)
    }
}
import { NextFunction, Request, Response } from "express";
import { createSuppliers, deleteSupplier, editSupplier, getAllSuppliers, getSupplier } from "./supplier.repository";
import { getAuth } from "@clerk/express";
import { ApiError, NotFoundError } from "../../../middleware/error/errorClasses";

export const createSupplierHandler = async (req: Request, res: Response) => {
    const suppliers = req.body;
    
    try {
        const respnose = await createSuppliers(suppliers);

        res.status(200).json(respnose)
    } catch (error) {
        console.log(error)
    }
}

export const getAllSuppliersHandler = async (req: Request, res: Response) => {
    // const { userId }  = getAuth(req);
    // if (!userId) {
    //     throw new NotFoundError("No User Found")
    // }
    // console.log(userId);
    
    try {
        const response = await getAllSuppliers();
        // console.log(req.headers.authorization)
        res.status(200).json(response);
    } catch (error) {
        console.log(error)
    }
}

export const getSupplierHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    try {
        const supplier = await getSupplier(id)

        if (!supplier) {
            throw new ApiError("no supplier with this id", 400)
        }
        res.status(200).json(supplier)
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
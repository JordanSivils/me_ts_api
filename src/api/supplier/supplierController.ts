import { Request, Response } from "express";
import { createSupplier, deleteSupplierById , editSupplierById, getAllSuppliers, getSupplierById } from "./prisma/supplierData";
import { parse } from "path";

export const createSupplierHandler = async (req: Request, res: Response) => {
  const { name } = req.body

  if (!name) {
    res.status(400).json({ error: "Supplier name required"})
  }
  try {
    const supplier = await createSupplier(name)
    res.status(201).json(supplier)
  } catch (error) {
    res.status(500).json({ error: "Failed to create supplier" });
  }
}

export const getAllSuppliersHandler = async (req: Request, res: Response) => {
  try {
    const suppliers = await getAllSuppliers()
    res.json(suppliers)
  } catch (error) {
    res.status(500).json({ error: "Failed to create supplier" });
  }
}

export const getSupplierByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) {
    res.status(400).json({ error: "couldnt find name"})
  }
  try {
    const supplier = await getSupplierById(parseInt(id));
    res.json(supplier)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch supplier" });
  }
}

export const deleteSupplierByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const supplier = await deleteSupplierById(parseInt(id));
    res.status(200).json({ message: "Supplier deleted", supplier });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete supplier" });
  }
}

export const editSupplierbyIdHandler = async (req: Request, res: Response) => {
  const { id } = req.params
  const { name } = req.body

  try {
    const data = await editSupplierById(parseInt(id), name)
    res.status(200).json({ message: "Supplier Edited", data });
  } catch (error) {
    res.status(500).json({ error: "Failed to edit supplier" });
  }
}
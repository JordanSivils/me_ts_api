import express from 'express'
import { createSupplierHandler, deleteSupplierByIdHandler, editSupplierbyIdHandler, getAllSuppliersHandler, getSupplierByIdHandler } from './supplierController';

const router = express.Router()

router.post('/api/supplier/create', createSupplierHandler);
router.get('/api/supplier/:id', getSupplierByIdHandler);
router.get('/api/suppliers', getAllSuppliersHandler);
router.delete('/api/supplier/delete/:id', deleteSupplierByIdHandler);
router.put('/api/supplier/edit/:id', editSupplierbyIdHandler)

export default router;
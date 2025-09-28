import { Router } from "express";
import { createSupplierHandler, deleteSupplierHandler, editSupplierHandler, getAllSuppliersHandler, getSupplierHandler } from "./supplier.controller";
import { requireAuth } from "../../../middleware/routePermissions";

const router = Router();

router.post("/supplier", requireAuth, createSupplierHandler);
router.get("/suppliers", getAllSuppliersHandler);
router.get("/supplier/:id", getSupplierHandler);
router.delete("/supplier/:id", deleteSupplierHandler);
router.put("/supplier/:id", editSupplierHandler);

//export default router;
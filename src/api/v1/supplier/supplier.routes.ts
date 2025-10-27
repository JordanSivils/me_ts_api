import { Router } from "express";
import { createSupplierHandler, deleteSupplierHandler, editSupplierHandler, getAllSuppliersHandler, getSupplierHandler } from "./supplier.controller";
import { requireAuth, requireRoles } from "../../../middleware/routePermissions";

const router = Router();

// router.post("/supplier", requireAuth, createSupplierHandler);
router.get("/suppliers", requireRoles({ hasAny: ["employee"]}), getAllSuppliersHandler);
router.get("/supplier/:id", requireRoles({ hasAny: ["employee"]}), getSupplierHandler);
// router.delete("/supplier/:id", deleteSupplierHandler);
// router.put("/supplier/:id", editSupplierHandler);

export default router;
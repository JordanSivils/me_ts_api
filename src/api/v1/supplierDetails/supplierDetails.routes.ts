import { Router } from "express";
import { createSupplierDetailsHandler, updateSupplierDetailsHandler } from "./supplierDetails.controller";
import { requireRoles } from "../../../middleware/routePermissions";

const router = Router();

router.post("/supplier-details", requireRoles({ hasAny: ["employee"]}),createSupplierDetailsHandler);
router.patch("/supplier-details/:id", requireRoles({ hasAny: ["employee"]}), updateSupplierDetailsHandler);
export default router;

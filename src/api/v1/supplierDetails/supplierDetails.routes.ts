import { Router } from "express";
import { createSupplierDetailsHandler } from "./supplierDetails.controller";
import { requireRoles } from "../../../middleware/routePermissions";

const router = Router();

router.post("/supplier-details", requireRoles({ hasAny: ["employee"]}),createSupplierDetailsHandler);

export default router;

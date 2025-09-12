import { Router } from "express";
import { createSupplierHandler, deleteSupplierHandler, editSupplierHandler, getAllSuppliersHandler, getSupplierHandler } from "./v1/supplier/supplier.controller";
import { requireAdmin } from "../middleware/clerk/clerkMiddleware";
import { getUsers, updateUser } from "./v1/users/user.controller";
import { validateBody, validateParams, validateQuery } from "../middleware/validation/zodMiddleware";
import { supplierUploadSchema } from "./v1/supplier/supplier.validation";
import { memUpload } from "../services/multer";
import { converExcelToPdf } from "./v1/inventory/iventory.controller";


const router = Router();

router.put("/user", requireAdmin, updateUser);
router.get("/user", getUsers);

router.post("/supplier", createSupplierHandler);
router.get("/supplier", getAllSuppliersHandler);
router.get("/supplier/:id", getSupplierHandler);
router.delete("/supplier/:id", deleteSupplierHandler);
router.put("/supplier/:id", editSupplierHandler);



router.post("/inventory", memUpload().single("file"), converExcelToPdf)
export default router;
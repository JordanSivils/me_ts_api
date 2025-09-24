import { Router } from "express";
import { createSupplierHandler, deleteSupplierHandler, editSupplierHandler, getAllSuppliersHandler, getSupplierHandler } from "./v1/supplier/supplier.controller";
import { requireAdmin } from "../middleware/routePermissions";
import { getUsers, updateUser } from "./v1/users/user.controller";
import { validateBody, validateParams, validateQuery } from "../middleware/zodMiddleware";
import { memUpload } from "../services/multer";
import { uploadProducts } from "./v1/item/item.controller";
import { supplierUploadSchema } from "./v1/supplier/types/supplierTypes";


const router = Router();

router.put("/user", requireAdmin, updateUser);
router.get("/user", getUsers);

router.post("/supplier", createSupplierHandler);
router.get("/supplier", getAllSuppliersHandler);
router.get("/supplier/:id", getSupplierHandler);
router.delete("/supplier/:id", deleteSupplierHandler);
router.put("/supplier/:id", editSupplierHandler);


// file upload for full products

router.post("/upload/products", memUpload().single("file"),uploadProducts)


export default router;
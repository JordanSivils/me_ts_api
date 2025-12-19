import { Router } from "express";
import { getAllProductsHandler } from "./product.controller";
import { requireRoles } from "../../../middleware/routePermissions";

const router = Router();

router.get("/products", requireRoles({ hasAny: ["employee"]}), getAllProductsHandler)

export default router;
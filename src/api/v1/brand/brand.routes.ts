import { Router } from "express";
import { requireRoles } from "../../../middleware/routePermissions";
import { getAllBrandsHandler } from "./brand.controller";

const router = Router();

router.get("/brands", requireRoles({ hasAny: ["employee"]}), getAllBrandsHandler);

export default router;
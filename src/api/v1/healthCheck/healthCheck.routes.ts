import { Router } from "express";
import { requireAuth } from "../../../middleware/routePermissions";
import { healthCheck } from "./healthCheck";

const router = Router();

router.get("/health", healthCheck);

export default router;
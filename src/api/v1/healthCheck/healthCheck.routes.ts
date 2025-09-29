import { Router } from "express";
import { healthCheck } from "./healthCheck";

const router = Router();

router.get("/health", healthCheck);

export default router;
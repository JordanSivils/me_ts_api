import { Router } from "express";

import itemRouter from "./v1/item/item.routes"
import health from "./v1/healthCheck/healthCheck.routes"

const router = Router();

router.use(health);
router.use(itemRouter);

export default router;
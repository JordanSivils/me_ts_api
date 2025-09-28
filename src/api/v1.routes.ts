import { Router } from "express";

import itemRouter from "./v1/item/item.routes"

const router = Router();

router.use(itemRouter);

export default router;
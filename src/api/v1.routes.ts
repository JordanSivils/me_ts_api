import { Router } from "express";

import itemRouter from "./v1/item/item.routes"
import health from "./v1/healthCheck/healthCheck.routes"
import supplierRouter from "./v1/supplier/supplier.routes"
import useRouter from "./v1/users/user.routes"
const router = Router();

router.use(health);
router.use(itemRouter);
router.use(supplierRouter);
router.use(useRouter);

export default router;
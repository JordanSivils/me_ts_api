import { Router } from "express";

import itemRouter from "./v1/item/item.routes"
import health from "./v1/healthCheck/healthCheck.routes"
import supplierRouter from "./v1/supplier/supplier.routes"
import userRouter from "./v1/users/user.routes"
import supplierDetailsRouter from "./v1/supplierDetails/supplierDetails.routes"
const router = Router();

router.use(health);
router.use(itemRouter);
router.use(supplierRouter);
router.use(userRouter);
router.use(supplierDetailsRouter);

export default router;
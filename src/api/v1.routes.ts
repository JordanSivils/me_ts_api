import { Router } from "express";

import itemRouter from "./v1/item/item.routes"
import health from "./v1/healthCheck/healthCheck.routes"
import supplierRouter from "./v1/supplier/supplier.routes"
import userRouter from "./v1/users/user.routes"
import supplierDetailsRouter from "./v1/supplierDetails/supplierDetails.routes"
import brandRouter from "./v1/brand/brand.routes"
import productsRouter from "./v1/products/product.routes"
import categoryRouter from "./v1/category/category.routes"
const router = Router();

router.use(health);
router.use(itemRouter);
router.use(supplierRouter);
router.use(userRouter);
router.use(supplierDetailsRouter);
router.use(brandRouter);
router.use(productsRouter);
router.use(categoryRouter)

export default router;
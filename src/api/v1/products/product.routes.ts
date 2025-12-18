import { Router } from "express";
import { getAllProductsHandler } from "./product.controller";

const router = Router();

router.get("/products", getAllProductsHandler)

export default router;
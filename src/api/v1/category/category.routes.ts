import { Router } from "express";
import { getAllCategoriesHandler } from "./category.controller";

const router = Router()

router.get("/categories", getAllCategoriesHandler)

export default router;
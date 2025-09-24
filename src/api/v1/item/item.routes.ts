import { Router } from "express";
import { requireAuth } from "../../../middleware/routePermissions";
import { validateQuery } from "../../../middleware/zodMiddleware";
import { ItemQuery } from "./types/itemFields";
import { getAllItemsHandler } from "./item.controller";

const router = Router();

router.get("/items", validateQuery(ItemQuery), getAllItemsHandler)

export default router
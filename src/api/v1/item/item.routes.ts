import { Router } from "express";
import { requireAuth } from "../../../middleware/routePermissions";
import { validateBody, validateQuery } from "../../../middleware/zodMiddleware";
import { CreateItemBody, ItemQuery } from "./types/itemFields";
import { createItemHandler, getAllItemsHandler } from "./item.controller";

const router = Router();

router.get("/items", validateQuery(ItemQuery), getAllItemsHandler)
router.post("/item", validateBody(CreateItemBody), createItemHandler);

export default router
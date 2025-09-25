import { Router } from "express";
import { requireAuth } from "../../../middleware/routePermissions";
import { validateBody, validateParams, validateQuery } from "../../../middleware/zodMiddleware";
import { CreateItemBody, ItemQuery, PutItemBody } from "./types/itemFields";
import { createItemHandler, getAllItemsHandler, getItemHandler, putItemHandler } from "./item.controller";
import { IdParams } from "../../../sharedSchemas/globalZodSchemas";

const router = Router();

router.get("/items", validateQuery(ItemQuery), getAllItemsHandler)
router.get("/item/:id", validateParams(IdParams), getItemHandler)
router.post("/item", validateBody(CreateItemBody), createItemHandler);
router.put("/item/:id", validateParams(IdParams), validateBody(PutItemBody), putItemHandler)

export default router
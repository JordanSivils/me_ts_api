import { Router } from "express";
import { requireAuth } from "../../../middleware/routePermissions";
import { validateBody, validateParams, validateQuery } from "../../../middleware/zodMiddleware";
import { CreateItemBody, ItemQuery, PatchItemBody, PutItemBody } from "./types/itemFields";
import { createItemHandler, getAllItemsHandler, getItemHandler, patchItemHandler, putItemHandler } from "./item.controller";
import { IdParams } from "../../../sharedSchemas/globalZodSchemas";

const router = Router();

router.get("/items", validateQuery(ItemQuery), getAllItemsHandler)
router.get("/item/:id", validateParams(IdParams), getItemHandler)
router.post("/item", validateBody(CreateItemBody), createItemHandler);
router.put("/item/:id", validateParams(IdParams), validateBody(PutItemBody), putItemHandler)
router.patch("/item/:id", validateParams(IdParams), validateBody(PatchItemBody), patchItemHandler)

export default router
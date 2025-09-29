import { Router } from "express";
import { requireAuth } from "../../../middleware/routePermissions";
import { validateBody, validateParams, validateQuery } from "../../../middleware/zodMiddleware";
import { CreateItemBody, ItemQuery, PatchItemBody, PutItemBody } from "./types/itemFields";
import { createItemHandler, getAllItemsHandler, getItemHandler, getNegativeInventoryHandler, patchItemHandler, putItemHandler, uploadProducts } from "./item.controller";
import { IdParams } from "../../../sharedSchemas/globalZodSchemas";
import { memUpload } from "../../../services/multer";

const router = Router();

router.post("/upload/products", memUpload().single("file"), uploadProducts)

router.get("/items", requireAuth, validateQuery(ItemQuery), requireAuth, getAllItemsHandler)
router.get("/item/:id", requireAuth, validateParams(IdParams), getItemHandler)
router.post("/item", requireAuth, validateBody(CreateItemBody), createItemHandler);
router.put("/item/:id", requireAuth, validateParams(IdParams), validateBody(PutItemBody), putItemHandler)
router.patch("/item/:id", requireAuth, validateParams(IdParams), validateBody(PatchItemBody), patchItemHandler)

router.get("/inventory/negative", requireAuth, getNegativeInventoryHandler);

export default router
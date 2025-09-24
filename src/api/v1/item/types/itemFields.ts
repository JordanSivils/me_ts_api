import z from "zod";
import {  Cursor, ItemStatusEnum, LimitAmount, OptionalInt, OptionalUuid, QueryString, RequiredString, Sku, Uuid } from "../../../../sharedSchemas/globalZodSchemas";

export const ItemFields = z.object({
    id: Uuid,
    Sku: Sku,
    description: RequiredString,
    status: ItemStatusEnum,
    available: OptionalInt.nullable(),
    manufaturerId: OptionalUuid,
    supplierId: OptionalUuid,
    brandId: OptionalUuid,
    categoryId: OptionalUuid,
    createdAt: z.date(),
    updatedAt: z.date()
});

// for queries item?query=lkajsdfj&

export const ItemQuery = z.object({
    limit: LimitAmount,
    cursor: Cursor,
    query: QueryString,
    sortBy: z.enum(["createdAt", "updatedAt"]).optional().default("createdAt"),
    sortDir: z.enum(["asc", "desc"]).optional().default("desc"),
    status: ItemStatusEnum.optional(),
    manufaturerId: OptionalUuid,
    supplierId: OptionalUuid,
    brandId: OptionalUuid,
    categoryId: OptionalUuid
});

export type ItemQuery = z.infer<typeof ItemQuery>;

// create 
export const CreateItemBody = z.object({
    sku: Sku,
    description: RequiredString,
    available: OptionalInt,
    manufaturerId: OptionalUuid,
    supplierId: OptionalUuid,
    brandId: OptionalUuid,
    categoryId: OptionalUuid
});

export type CreateItemBody = z.infer<typeof CreateItemBody>;

// put
export const PutItemBody = z.object({
  sku: Sku,
  description: RequiredString,
  available: z.number().int().optional(),
  status: ItemStatusEnum,                          
  manufacturerId: OptionalUuid,
  brandId: OptionalUuid,
  categoryId: OptionalUuid,
});
export type PutItemBody = z.infer<typeof PutItemBody>;

// patch

export const PatchItemBody = z.object({
  sku: Sku.optional(),
  description: RequiredString.optional(),
  available: z.number().int().optional(),
  status: ItemStatusEnum.optional(),
  manufacturerId: OptionalUuid,
  brandId: OptionalUuid,
  categoryId: OptionalUuid,
}).refine(obj => Object.keys(obj).length > 0, { message: "No fields provided" });
export type PatchItemBody = z.infer<typeof PatchItemBody>;
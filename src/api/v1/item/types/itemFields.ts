import z from "zod";
import {  CoerceOptionalInt, Cursor, ItemStatusEnum, LimitAmount, OptionalInt, OptionalUuid, QueryString, RequiredString, Sku, Uuid } from "../../../../sharedSchemas/globalZodSchemas";
import { ItemStatus } from "@prisma/client";

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
    page: z.coerce.number().default(1),
    limit: z.coerce.number().min(1).max(100).default(25),
    query: QueryString,
    sortBy: z.enum(["createdAt"]).optional().default("createdAt"),
    sortDir: z.enum(["asc", "desc"]).optional().default("desc"),
    status: ItemStatusEnum.optional(),
    manufacturerId: OptionalUuid,
    supplierId: OptionalUuid,
    brandId: OptionalUuid,
    categoryId: OptionalUuid
});

export type ItemQuery = z.infer<typeof ItemQuery>;

// create 
export const CreateItemBody = z.object({
    sku: Sku,
    description: RequiredString,
    available: CoerceOptionalInt,
    manufacturerId: OptionalUuid,
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
  supplierId: z.array(OptionalUuid)
});
export type PutItemBody = z.infer<typeof PutItemBody>;

// patch

export const PatchItemBody = z.object({
  sku: Sku.optional(),
  description: RequiredString.optional(),
  available: CoerceOptionalInt,
  status: ItemStatusEnum.optional(),
  manufacturerId: OptionalUuid,
  brandId: OptionalUuid,
  categoryId: OptionalUuid,
  supplierId: z.array(z.uuid())
    .transform(ids => Array.from(new Set(ids)))
    .optional()
}).refine(obj => Object.keys(obj).length > 0, { message: "No fields provided" });
export type PatchItemBody = z.infer<typeof PatchItemBody>;

export const StatusQuery = z.object({
  status: z.enum(ItemStatus).optional()
})
import z from "zod";

export const Uuid = z.string().min(1);
export const Sku = z.string().trim().min(1).max(15);
export const RequiredString = z.string().trim().min(1);
export const OptionalUuid = z.string().optional();
export const RequiredInt = z.number();
export const OptionalInt = z.number().optional();
export const CoerceInt = z.coerce.number().int();
export const CoerceOptionalInt = z.number().optional();

// pagination
export const PageNumber = z.coerce.number().int().min(1).default(1)
export const LimitAmount = z.coerce.number().int().min(1).max(100).default(25)
export const Cursor = z.string().optional();
export const QueryString = z.string().min(1).max(100).optional();

export const ItemStatusEnum = z.enum(["negative", "standard"]);

export const IdParams = z.object({ 
    id: Uuid
});

export type IdParams = z.infer<typeof IdParams>;


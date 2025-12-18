import z from "zod";
import { SupplierSchema } from "../../supplier/types/supplierTypes";
import { BrandSchema } from "../../brand/types/brandTypes";
import { CategorySchema } from "../../category/types/categoryTypes";

export const ProductSchema = z.object({
    id: z.uuid,
    sku: z.string().min(1),
    descritpion: z.string().min(1),
    status: z.string().min(1),
    available: z.coerce.number().optional(),
    suppliers: z.array(SupplierSchema).optional(),
    brandId: z.uuid().optional(),
    brand: BrandSchema.optional(),
    categoryId: z.uuid().optional(),
    category: CategorySchema.optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional()
});
export type Product = z.infer<typeof ProductSchema>;
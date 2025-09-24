import z from "zod";

export const ItemRowSchema = z.object({
    sku: z.string().trim().min(1, "SKU Required"),
    description: z.string().trim().min(1),
    cost: z.coerce.number().optional(),
    markup: z.coerce.number().optional(),
    price: z.coerce.number().optional(),
    available: z.number().int().optional(),
    manufacturer: z.string().trim().optional(),
    brand: z.string().trim().optional(),
    category: z.string().trim().optional(),
    barcode: z.string().trim().optional(),
    supplier: z.string().trim().optional()
})

export const TransformedItemSchema = z.object({
    sku: z.string().trim().min(1, "SKU Required"),
    description: z.string().trim().min(1),
    available: z.number().int().optional(),
    manufacturer: z.string().trim().optional(),
    brand: z.string().trim().optional(),
    category: z.string().trim().optional(),
    supplier: z.string().trim().optional()
})

export type TransformedItemRow = z.infer<typeof TransformedItemSchema>
export type ItemRow = z.infer<typeof ItemRowSchema>
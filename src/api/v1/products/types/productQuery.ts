import z from "zod";

export const ProductQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(150).default(25),
    search: z.string().optional(),//.default(undefined), // debounce on fe
    status: z.enum(["standard", "negative"]).optional(),
    brand: z.string().optional(),
    supplier: z.string().optional(),
    category: z.string().optional(),
    sortby: z.enum(["available", "description"]).optional().default("description"),
    sortdir: z.enum(["asc", "desc"]).optional().default("asc")
})
export type ProductQuery = z.infer<typeof ProductQuerySchema>
import z from "zod";

export const SupplierSchema = z.object({
    id: z.uuid(),
    name: z.string().min(1),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date()
})
export type SupplierSchema = z.infer<typeof SupplierSchema>

export const SupplierQuery = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(50).default(25),
    sortDir: z.enum(["asc", "desc"]).default("desc"),
    search: z.string().min(1).optional()
})

export type SupplierQuery = z.infer<typeof SupplierQuery>

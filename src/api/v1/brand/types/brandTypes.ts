import z from "zod"

export const BrandSchema = z.object({
    id: z.uuid(),
    name: z.string().min(1),
})
export type Brand = z.infer<typeof BrandSchema>

export const BrandQuery = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(400).default(25),
})

export type BrandQuery = z.infer<typeof BrandQuery>
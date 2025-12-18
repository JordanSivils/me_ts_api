import z from "zod";

export const CategorySchema = z.object({
    id: z.uuid(),
    name: z.string().min(1)
})
export type Category = z.infer<typeof CategorySchema>

export const CategoryQuerySchema = z.object({
    page: z.coerce.number().default(1),
    limit: z.coerce.number().max(100).default(25)
})
export type CategoryQuery = z.infer<typeof CategoryQuerySchema>
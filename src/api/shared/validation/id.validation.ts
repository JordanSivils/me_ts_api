import z from "zod";

export const idParamSchema = z.object({
    id: z.string().trim().min(1)
})

export type IdParam = z.infer<typeof idParamSchema>
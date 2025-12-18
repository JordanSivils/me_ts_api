import z from "zod";

export const UserPatchSchema = z.object({
    email: z.string().min(1).optional(),
    phoneNumber: z.string().min(1).optional()
})
export type UserPatch = z.infer<typeof UserPatchSchema>;

export const UserListQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(400).default(25),
    sortDir: z.enum(["asc", "desc"]).default("desc"),
})
export type UserListQuery = z.infer<typeof UserListQuerySchema>
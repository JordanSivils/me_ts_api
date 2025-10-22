import z from "zod";

export const UserPatchSchema = z.object({
    email: z.string().min(1).optional(),
    phoneNumber: z.string().min(1).optional()
})
export type UserPatch = z.infer<typeof UserPatchSchema>;
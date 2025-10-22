import z from "zod";
import { RequiredString } from "../../../../sharedSchemas/globalZodSchemas";

export const UserBodySchema = z.object({
    clerkId: z.string().min(1),
    firstName: RequiredString,
    lastName: RequiredString,
    email: RequiredString,
    phoneNumber: RequiredString,
})

export type UserBody = z.infer<typeof UserBodySchema>
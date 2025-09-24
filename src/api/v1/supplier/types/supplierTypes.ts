import z from "zod";

export const supplierUploadSchema = z.object({
    name: z.string().min(2),
    orderDetailsId: z.string()
})
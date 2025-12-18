import z from "zod";

export const SupplierDetailsBodySchema = z.object({
    userId: z.uuid().optional(),
    orderDay: z.string().min(1).optional(),
    orderNotes: z.string().min(1).optional(),
    orderMinimum: z.string().min(1).optional(),
    supplierId: z.uuid()
});
export type SupplierDetailsBody = z.infer<typeof SupplierDetailsBodySchema>;

export const SupplierDetailsPutSchema = z.object({
    userId: z.uuid().optional(),
    orderDay: z.string().optional(),
    orderNotes: z.string().optional(),
    orderMinimum: z.string().min(1).optional(),
})

export type SupplierDetailsPut = z.infer<typeof SupplierDetailsPutSchema>
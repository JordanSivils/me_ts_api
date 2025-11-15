import z from "zod";

export const SupplierDetailsBodySchema = z.object({
    userId: z.uuid().optional(),
    orderDay: z.enum(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]).optional(),
    orderNotes: z.string().min(1).optional(),
    orderMinimum: z.string().min(1).optional(),
    supplierId: z.uuid()
});
export type SupplierDetailsBody = z.infer<typeof SupplierDetailsBodySchema>;

export const SupplierDetailsPut = SupplierDetailsBodySchema.partial();
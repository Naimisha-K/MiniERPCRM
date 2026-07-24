import { z } from "zod";

export const inventorySchema = z.object({

    productId: z.number(),

    quantity: z.number().positive(),

    reason: z.string().min(3),

});
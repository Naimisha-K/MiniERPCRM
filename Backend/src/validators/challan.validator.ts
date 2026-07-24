import { z } from "zod";

export const challanSchema = z.object({
    customerId: z.number(),

    items: z.array(
        z.object({
            productId: z.number(),
            quantity: z.number().positive(),
            price: z.number().positive(),
        })
    ).min(1, "At least one product is required")
});
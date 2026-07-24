import { z } from "zod";

export const productSchema = z.object({
    productName: z.string()
        .min(2, "Product name must be at least 2 characters"),

    sku: z.string()
        .min(3, "SKU must be at least 3 characters"),

    category: z.string()
        .min(2),

    unitPrice: z.number()
        .positive("Price must be greater than 0"),

    currentStock: z.number()
        .min(0),

    minimumStock: z.number()
        .min(0),

    warehouse: z.string()
        .min(2),
});
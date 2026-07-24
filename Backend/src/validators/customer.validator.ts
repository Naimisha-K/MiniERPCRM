import { z } from "zod";

export const customerSchema = z.object({
    customerName: z.string().min(3),
    mobile: z.string().min(10).max(10),
    email: z.string().email().optional(),

    businessName: z.string(),

    gstNumber: z.string().optional(),

    customerType: z.enum([
        "RETAIL",
        "WHOLESALE",
        "DISTRIBUTOR"
    ]),

    address: z.string(),

    status: z.enum([
        "LEAD",
        "ACTIVE",
        "INACTIVE"
    ]),

    followUpDate: z.string().optional(),

    notes: z.string().optional()
});
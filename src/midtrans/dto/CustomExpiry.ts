import { z } from "zod";

export const CustomExpirySchema = z.object({
    order_time: z.string(),
    expiry_duration: z.number(),
    unit: z.string()
})

export type CustomExpiry = z.infer<typeof CustomExpirySchema>
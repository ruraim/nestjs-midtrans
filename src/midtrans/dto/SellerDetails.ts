import { z } from "zod";

export const SellerDetailsSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    url: z.string(),
    address: z.object({
        first_name: z.string(),
        last_name: z.string(),
        email: z.string(),
        phone: z.string(),
        address: z.string(),
        city: z.string(),
        postal_code: z.string(),
        country_code: z.string(),
    })
}).deepPartial()

export type SellerDetails = z.infer<typeof SellerDetailsSchema>
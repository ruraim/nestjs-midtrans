import { z } from "zod";
import { BillingAddressSchema, ShippingAddressSchema } from "./BillingAddress";

export const CustomerDetailsSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string(),
    phone: z.string(),
    billing_address: z.array(BillingAddressSchema),
    shipping_address: z.array(ShippingAddressSchema)
}).deepPartial()

export type CustomerDetails = z.infer<typeof CustomerDetailsSchema>
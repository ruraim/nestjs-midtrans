import { z } from "zod";

export const GopaySchema = z.object({
    enable_callback: z.boolean().default(false),
    callback_url: z.string().url().nullish(),
    account_id: z.string().nullish(),
    payment_option_token: z.string().nullish(),
    pre_auth: z.boolean().default(false),
    recurring: z.boolean().default(false),
    promotion_ids: z.array(z.string()).nullish()
})

export type Gopay = z.infer<typeof GopaySchema>
import { z } from 'zod'

export const GopayAccountSchema = z.object({
    payment_type: z.enum(['gopay']),
    gopay_partner: z.object({
        phone_number: z.string(),
        country_code: z.string(),
        redirect_url: z.string().nullish()
    }).nullish()
})

export type GopayAccount = z.infer<typeof GopayAccountSchema>
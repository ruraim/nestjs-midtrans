import { z } from 'zod'

export const UOBEzpaySchema = z.object({
    callback_url: z.string().nullish(),
})

export type UOBEzpay = z.infer<typeof UOBEzpaySchema>
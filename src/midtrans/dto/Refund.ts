import { z } from 'zod'

export const RefundSchema = z.object({
    refund_key: z.string().nullish(),
    amount: z.number().nullish(),
    reason: z.string().nullish(),
})

export type Refund = z.infer<typeof RefundSchema>
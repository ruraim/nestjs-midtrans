import { z } from 'zod'
import { CustomerDetailsSchema } from '../CustomerDetails'
import { GopaySchema } from '../payment/Gopay'
import { ScheduleSchema } from './Schedule'

export const SubscriptionSchema = z.object({
    name: z.string(),
    amount: z.number(),
    currency: z.string().default('IDR'),
    payment_type: z.enum(['credit_card', 'gopay']),
    token: z.string(),
    schedule: ScheduleSchema,
    metadata: z.record(z.string(), z.any()).nullish(),
    customer_details: CustomerDetailsSchema.nullish(),
    gopay: GopaySchema.nullish(),
})

export const SubscriptionUpdateSchema = SubscriptionSchema.pick({
    name: true,
    amount: true,
    currency: true,
    token: true,
}).merge(z.object({
    schedule: z.object({
        interval: z.number().nullish(),
        next_execution_at: z.string().nullish(),
    }).nullish(),
    gopay: z.object({
        account_id: z.string().nullish(),
    }).nullish()
}))

export type Subscription = z.infer<typeof SubscriptionSchema>
export type SubscriptionUpdate = z.infer<typeof SubscriptionUpdateSchema>
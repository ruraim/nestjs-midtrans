import { z } from 'zod'

export const CaptureSchema = z.object({
    transaction_id: z.string(),
    gross_amount: z.number().nullish(),
})

export type Capture = z.infer<typeof CaptureSchema>
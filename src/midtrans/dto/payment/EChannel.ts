import { z } from 'zod'

export const EChannelSchema = z.object({
    bill_info1: z.string(),
    bill_info2: z.string(),
    bill_info3: z.string().nullish(),
    bill_info4: z.string().nullish(),
    bill_info5: z.string().nullish(),
    bill_info6: z.string().nullish(),
    bill_info7: z.string().nullish(),
    bill_info8: z.string().nullish(),
    bill_key: z.string()
})

export type EChannel = z.infer<typeof EChannelSchema>
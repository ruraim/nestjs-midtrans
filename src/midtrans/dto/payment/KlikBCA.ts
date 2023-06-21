import { z } from 'zod'

export const KlikBCASchema = z.object({
    description: z.string(),
    user_id: z.string()
})

export type KlikBCA = z.infer<typeof KlikBCASchema>
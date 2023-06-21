import { z } from 'zod'

export const CIMBOctoClickSchema = z.object({
    description: z.string()
})

export type CIMBOctoClick = z.infer<typeof CIMBOctoClickSchema>
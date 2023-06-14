import { z } from "zod";

export const MidtransConfigSchema = z.object({
    clientKey: z.string(),
    serverKey: z.string(),
    merchantId: z.string().nullish(),
    sandbox: z.boolean().default(false),
})

export type MidtransConfig = z.infer<typeof MidtransConfigSchema>
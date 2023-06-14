import { z } from "zod";

export const QRISSchema = z.object({
    acquirer: z.string().nullish(),
})

export type QRIS = z.infer<typeof QRISSchema>
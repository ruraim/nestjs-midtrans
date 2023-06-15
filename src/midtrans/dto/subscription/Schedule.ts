import { z } from "zod";

export const ScheduleSchema = z.object({
    interval: z.number(),
    interval_unit: z.enum(['day', 'week', 'month']),
    max_interval: z.number(),
    start_time: z.string(),
})

export type Schedule = z.infer<typeof ScheduleSchema>
import { z } from "zod";

export const meetingsInsertSchema = z.object({
    name: z.string().min(3, "Name is required"),
    agentId: z.string().min(1, "Name should be at least 1 character long"),
})

export const meetingsUpdateSchema = meetingsInsertSchema.extend({
    id: z.string().min(1, "Id should be at least 1 character long")
})
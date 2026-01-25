import { z } from "zod";
export const agentSchema = z.object({
    name: z.string().min(3, {
        message:
            "Name must be at least 3 characters"
    }),
    instructions: z.string().min(3, {
        message: "Instructions must be at least 3 characters"
    })
})


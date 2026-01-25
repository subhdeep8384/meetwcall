import { db } from "@/db"
import { agents } from "@/db/schema"
import { createTRPCRouter, baseProcedure, protectedProcedure } from "@/trpc/init"
import { agentSchema } from "../agentSchema";
import z from "zod";
import { eq } from "drizzle-orm";
// import { TRPCError } from "@trpc/server";


export const agentRouter = createTRPCRouter({
    getOne: baseProcedure.use(protectedProcedure).input(z.object({
        id: z.string()
    })).query(async (opts) => {
        const { id } = opts.input
        const [agentData] = await db.select().from(agents).where(eq(agents.id, id)).execute();
        return agentData;
    }),


    getMany: baseProcedure.use(protectedProcedure).query(async () => {
        const agentData = await db.select().from(agents);
        return agentData;
    }),

    create: baseProcedure.use(protectedProcedure).input(agentSchema).mutation(async (opts) => {
        const { name, instructions } = opts.input;
        const { auth } = opts.ctx;

        const [createdAgent] = await db.insert(agents).values({
            name: name,
            instructions: instructions,
            userId: auth.user.id,
            createdAt: new Date(),
            updatedAt: new Date()
        }).returning();
        return createdAgent;
    })
})

// {
//     id: text("id").primaryKey().$default(() => nanoid()),
//     name: text("name").notNull(),
//     userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
//     instructions: text("instructions").notNull(),
//     createdAt: timestamp("created_at").notNull().defaultNow(),
//     updatedAt: timestamp("updated_at").notNull().defaultNow()
// }
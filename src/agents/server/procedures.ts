import { db } from "@/db"
import { agents } from "@/db/schema"
import { createTRPCRouter, baseProcedure, protectedProcedure } from "@/trpc/init"
import { agentSchema, agentUpdateSchema } from "../agentSchema";
import z from "zod";
import { and, count, desc, eq, getTableColumns, ilike, sql } from "drizzle-orm";
import { MAX_PAGE_SIZE, PAGE, PAGE_SIZE } from "../../defaults/index"
import { TRPCError } from "@trpc/server";

// import { TRPCError } from "@trpc/server";


export const agentRouter = createTRPCRouter({

    update: baseProcedure.use(protectedProcedure).input(
        agentUpdateSchema
    ).mutation(async ({ ctx, input }) => {
        const updatedAgent = await db.update(agents).set(input).where(
            and(
                eq(agents.id, input.id),
                eq(agents.userId, ctx.auth.user.id)
            )
        )

        if (!updatedAgent) {
            throw new TRPCError({ code: "NOT_FOUND", message: "agent not found" })
        }
        return updatedAgent;
    }),
    remove: baseProcedure.use(protectedProcedure).input(z.object({
        id: z.string(),
    })).mutation(async ({ input, ctx }) => {
        const removedAgent = await db.delete(agents).where(
            and(
                eq(agents.id, input.id),
                eq(agents.userId, ctx.auth.user.id)
            )
        ).returning()

        if (!removedAgent) {
            throw new TRPCError({ code: "NOT_FOUND", message: "agent not found" })
        }

        return removedAgent;
    }),
    getOne: baseProcedure.use(protectedProcedure).input(z.object({
        id: z.string()
    })).query(async (opts) => {
        const { id } = opts.input
        const [agentData] = await db.select({
            ...getTableColumns(agents),
            meetingCount: sql`1`
        }).from(agents).where(
            and(
                eq(agents.id, id),
                eq(agents.userId, opts.ctx.auth.user.id)
            ))
            .execute();

        if (!agentData) {
            throw new TRPCError({ code: "NOT_FOUND", message: "agent not found" })
        }
        return agentData;
    }),


    getMany: baseProcedure.use(protectedProcedure).input(z.object({
        page: z.number().default(PAGE),
        pageSize: z.number().min(1).max(MAX_PAGE_SIZE).default(PAGE_SIZE),
        search: z.string().nullish()
    })).query(async ({ ctx, input }) => {
        const {
            search,
            page,
            pageSize
        } = input;

        const agentData = await db.select(
            {
                ...getTableColumns(agents),
                meetingCount: sql`2`
            }
        ).from(agents)
            .where(
                and(
                    eq(agents.userId, ctx.auth.user.id),
                    search ? ilike(agents.name, `%${search}%`) : undefined
                )
            ).orderBy(
                desc(agents.createdAt), desc(agents.id)
            ).limit(pageSize).offset((page - 1) * pageSize)
            ;
        const [total] = await db.select({
            count: count()
        }).from(agents).where(
            and(
                eq(agents.userId, ctx.auth.user.id),
                search ? ilike(agents.name, `%${search}%`) : undefined
            )
        )

        const totalPages = Math.ceil(total.count / pageSize)
        return {
            items: agentData,
            total: total.count,
            totalPages
        };
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
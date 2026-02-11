import { db } from "@/db"
import { meetings } from "@/db/schema"
import { createTRPCRouter, baseProcedure, protectedProcedure } from "@/trpc/init"
import z from "zod";
import { and, count, desc, eq, getTableColumns, ilike } from "drizzle-orm";
import { MAX_PAGE_SIZE, PAGE, PAGE_SIZE } from "../../defaults/index"
import { TRPCError } from "@trpc/server";



export const meetingsRouter = createTRPCRouter({
    getOne: baseProcedure.use(protectedProcedure).input(z.object({
        id: z.string()
    })).query(async (opts) => {
        const { id } = opts.input
        const [existingMeeting] = await db.select({
            ...getTableColumns(meetings),

        }).from(meetings).where(
            and(
                eq(meetings.id, id),
                eq(meetings.userId, opts.ctx.auth.user.id)
            ))
            .execute();

        if (!existingMeeting) {
            throw new TRPCError({ code: "NOT_FOUND", message: "agent not found" })
        }
        return existingMeeting;
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
                ...getTableColumns(meetings),
            }
        ).from(meetings)
            .where(
                and(
                    eq(meetings.userId, ctx.auth.user.id),
                    search ? ilike(meetings.name, `%${search}%`) : undefined
                )
            ).orderBy(
                desc(meetings.createdAt), desc(meetings.id)
            ).limit(pageSize).offset((page - 1) * pageSize)
            ;
        const [total] = await db.select({
            count: count()
        }).from(meetings).where(
            and(
                eq(meetings.userId, ctx.auth.user.id),
                search ? ilike(meetings.name, `%${search}%`) : undefined
            )
        )

        const totalPages = Math.ceil(total.count / pageSize)
        return {
            items: agentData,
            total: total.count,
            totalPages
        };
    }),

})

// {
//     id: text("id").primaryKey().$default(() => nanoid()),
//     name: text("name").notNull(),
//     userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
//     instructions: text("instructions").notNull(),
//     createdAt: timestamp("created_at").notNull().defaultNow(),
//     updatedAt: timestamp("updated_at").notNull().defaultNow()
// }
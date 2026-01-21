
import { createTRPCRouter } from '../init';
import { agentRouter } from "@/agents/server/procedures";
export const appRouter = createTRPCRouter({
    agents: agentRouter,
    // chut: chut
});
// export type definition of API
export type AppRouter = typeof appRouter;
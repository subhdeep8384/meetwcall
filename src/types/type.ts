import { inferRouterOutputs } from "@trpc/server"
import type { AppRouter } from "@/trpc/routers/_app"

export type AgentGetOne = inferRouterOutputs<AppRouter>["agents"]["getOne"]
export type AgentCreate = inferRouterOutputs<AppRouter>["agents"]['create']
export type AgentGetMany = inferRouterOutputs<AppRouter>["agents"]["getMany"]
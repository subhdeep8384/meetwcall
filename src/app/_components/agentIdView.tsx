"use client"

import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import React, { useState } from "react"
import AgentIdViewHeader from "./agentIdViewHeader"
import LoadingState from "@/components/loading-state"
import GeneratedAvatar from "./dashboardComponents/generatedAvatar"
import { Badge } from "@/components/ui/badge"
import { VideoIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useConfirmMessage } from "@/hooks/use-confirm-message"
import UpdateAgentDialogBox from "./updateAgentDialogBox"


interface Props {
    agentId: string
}

const AgentIdView = ({ agentId }: Props) => {
    const [updateAgentDialogOpen, setUpdateAgentDialogOpen] = useState(false)
    const router = useRouter();
    const queryClient = useQueryClient();
    const trpc = useTRPC()

    const { data } = useSuspenseQuery(
        trpc.agents.getOne.queryOptions({
            id: agentId,
        })
    )
    const removeAgent = useMutation(trpc.agents.remove.mutationOptions({
        onSuccess: async () => {
            await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}));
            toast.success("Agent deleted successfully")
            router.push("/agents")
        },
        onError: (error) => {
            toast.error(error.message)
        }
    }))

    const [ConfirmDialog, confirm] = useConfirmMessage(
        {
            title: "Are you sure you want to delete this agent?",
            description: "This action cannot be undone."
        }
    )
    const handleRemoveAgent = async () => {
        const ok = await confirm();
        if (!ok) return;
        await removeAgent.mutate({
            id: agentId
        })
    }

    if (!data) {
        return (
            <LoadingState
                title="Loading agent..."
                description="Please wait a moment"
            />
        )
    }

    return (
        <>
            <ConfirmDialog />
            <UpdateAgentDialogBox
                open={updateAgentDialogOpen}
                onOpenChange={setUpdateAgentDialogOpen}
                initialValues={data}
            />
            <div className="flex-1 px-4 py-6 md:px-8 flex flex-col gap-y-6">

                <AgentIdViewHeader
                    agentId={agentId}
                    agentName={data.name}
                    onEdit={() => setUpdateAgentDialogOpen(true)}
                    onRemove={handleRemoveAgent}
                />


                <div className="bg-white rounded-xl border shadow-sm">

                    <div className="flex items-center gap-x-6 px-6 py-6 border-b">
                        <GeneratedAvatar
                            variant="botttsNeutral"
                            seed={data.name}
                        />

                        <div className="flex flex-col gap-y-2">
                            <h2 className="text-2xl font-semibold text-neutral-900">
                                {data.name}
                            </h2>

                            <Badge
                                variant="outline"
                                className="w-fit flex items-center gap-x-2 text-sm"
                            >
                                <VideoIcon size={14} className="text-blue-500" />
                                {data.meetingCount} {data.meetingCount === 1 ? "meeting" : "meetings "}
                            </Badge>
                        </div>
                    </div>


                    <div className="px-6 py-5 flex flex-col gap-y-3">
                        <p className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
                            Instructions
                        </p>
                        <p className="text-neutral-800 leading-relaxed">
                            {data.instructions}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AgentIdView

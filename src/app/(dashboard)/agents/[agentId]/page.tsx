import React, { Suspense } from 'react'
import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary'
import LoadingState from '@/components/loading-state';
import ErrorState from '@/components/error-state';
import AgentIdView from '@/app/_components/agentIdView';

interface Props {
    params: Promise<{ agentId: string }>
}
const Page = async ({ params }: Props) => {
    const agentId = await params;
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(
        trpc.agents.getOne.queryOptions({
            id: agentId.agentId
        })
    )
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<LoadingState title='Agent' description='wait a few second for agent to come' />} >
                <ErrorBoundary fallback={<ErrorState title='Error' description='something went wrong' />}>
                    <AgentIdView
                        agentId={agentId.agentId}
                    />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary >
    )
}

export default Page
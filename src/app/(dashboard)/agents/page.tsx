"use server"
import React, { Suspense } from 'react'
import AgentView from '../../_components/agentView'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import LoadingState from '@/components/loading-state';
import ListAgents from '@/app/_components/listAgents';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const Agents = async () => {

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions())

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        redirect('/sign-in')
    }
    return (
        <>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ListAgents />
                <Suspense fallback={<LoadingState title='Agents' description='wait a few second for agents to come' />} >
                    <AgentView />
                </Suspense>
            </HydrationBoundary>
        </>
    )
}

export default Agents

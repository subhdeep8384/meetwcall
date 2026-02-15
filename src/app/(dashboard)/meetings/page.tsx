import MeetingListHeader from '@/app/_components/meetings/meetingListHeader';
import MeetingView from '@/app/_components/meetings/meetingView'
import ErrorState from '@/components/error-state';
import LoadingState from '@/components/loading-state';
import { auth } from '@/lib/auth';
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary';

const Page = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session) {
        redirect("/sign-in")
    }

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions({}))

    return (
        <>
            <MeetingListHeader />
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={<LoadingState title='Showing meetings' description='wait a few second for meetings to come' />} >
                    <ErrorBoundary fallback={<ErrorState title='Error' description='something went wrong' />}>
                        <MeetingView />
                    </ErrorBoundary>
                </Suspense>
            </HydrationBoundary>
        </>
    )
}

export default Page

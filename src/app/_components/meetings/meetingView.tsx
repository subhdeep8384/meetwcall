"use client"
import { DataTable } from '@/components/data-table/data-table';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react'
import { columns } from './column';

const MeetingView = () => {
    const trpc = useTRPC()
    const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}))
    return (
        <div className='overflow-x-hidden p-4'>
            <DataTable data={data.items} columns={columns} />
        </div>
    )
}

export default MeetingView

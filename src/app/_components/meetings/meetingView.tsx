"use client"
import { DataTable } from '@/components/data-table/data-table';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react'
import { columns } from './column';
import MeetingPagination from '../pagination/meetingPagination';
import { useMeetingFilter } from '@/hooks/meeting/use-meeting-filter';

const MeetingView = () => {
    const [filters, setFilters] = useMeetingFilter()
    const trpc = useTRPC()
    const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({
        ...filters
    }))
    return (
        <div className='overflow-x-hidden p-4'>
            <DataTable data={data.items} columns={columns} />
            <MeetingPagination
                page={filters.page}
                totalPages={data.totalPages}
                onPageChange={(page) => setFilters({ page })}
            />
        </div>
    )
}

export default MeetingView

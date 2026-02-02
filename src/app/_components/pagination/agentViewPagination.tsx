import { Button } from '@/components/ui/button'
import React from 'react'

interface Props {
    page: number
    // setFilters: (e: Event) => void
    totalPages: number
    onPageChange: (page: number) => void
}

const AgentViewPagination = ({
    page,
    totalPages,
    // setFilters,
    onPageChange
}: Props) => {
    return (
        <div className='flex items-center justify-between abosu'>
            <div className='flex text-sm text-muted-foreground'>
                Page {page} of {totalPages || 1}
            </div>
            <div className='flex items-center justify-end space-x-2 py-1 '>
                <Button
                    disabled={page === 1}
                    onClick={() => onPageChange(page - 1)}
                    variant={"outline"}
                    size={"sm"}
                >
                    previous
                </Button>
                <Button
                    disabled={page === totalPages || totalPages === 0}
                    onClick={() => onPageChange(page + 1)}
                    variant={"outline"}
                    size={"sm"}
                >
                    next
                </Button>
            </div>

        </div>
    )
}

export default AgentViewPagination

import React from 'react'
import { SearchIcon } from "lucide-react"
import { Input } from '@/components/ui/input'
import { useMeetingFilter } from '@/hooks/meeting/use-meeting-filter'


const MeetingSearchFilter = () => {

    const [filters, setFilters] = useMeetingFilter()
    return (
        <div className='relative px-5'>
            <Input
                placeholder='search meetings'
                className='h-9 bg-white w-50 pl-7 '
                value={filters.search}
                onChange={(e) => {
                    setFilters({
                        search: e.target.value
                    })
                }}
            />
            <SearchIcon
                className='size-4 absolute left-2 top-1/2 -translate-1/2 text-muted-foreground'
            />
        </div>
    )
}

export default MeetingSearchFilter

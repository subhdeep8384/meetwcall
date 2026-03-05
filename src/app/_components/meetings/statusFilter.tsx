import {
    CircleXIcon,
    CircleCheckIcon,
    ClockArrowUpIcon,
    VideoIcon,
    LoaderIcon,

} from "lucide-react"
import { MeetingStatus } from "@/types/type"
import { useMeetingFilter } from "@/hooks/meeting/use-meeting-filter"
import { MeetingCommandSelect } from "./meetingCommandSelect"



const option = [
    {
        id: MeetingStatus.Upcomming,
        value: MeetingStatus.Upcomming,
        children: (
            <div className="flex items-center gap-x-2 capitalize">
                <ClockArrowUpIcon />
                {
                    MeetingStatus.Upcomming
                }
            </div>
        )
    },
    {
        id: MeetingStatus.Completed,
        value: MeetingStatus.Completed,
        children: (
            <div className="flex items-center gap-x-2 capitalize">
                <CircleCheckIcon />
                {
                    MeetingStatus.Completed
                }
            </div>
        )
    },
    {
        id: MeetingStatus.Active,
        value: MeetingStatus.Active,
        children: (
            <div className="flex items-center gap-x-2 capitalize">
                <VideoIcon />
                {
                    MeetingStatus.Active
                }
            </div>
        )
    },
    {
        id: MeetingStatus.Processing,
        value: MeetingStatus.Processing,
        children: (
            <div className="flex items-center gap-x-2 capitalize">
                <LoaderIcon />
                {
                    MeetingStatus.Processing
                }
            </div>
        )
    },
    {
        id: MeetingStatus.Cancelled,
        value: MeetingStatus.Cancelled,
        children: (
            <div className="flex items-center gap-x-2 capitalize">
                <CircleXIcon />
                {
                    MeetingStatus.Cancelled
                }
            </div>
        )
    }
]

export const StatusFilter = () => {
    const [filters, setFilters] = useMeetingFilter();
    return (
        <MeetingCommandSelect
            className="flex "
            placeholder="Status"
            options={option}
            onSelect={(value) => setFilters({ status: value as MeetingStatus })}
            value={filters.status || ""}
        />

    )
}
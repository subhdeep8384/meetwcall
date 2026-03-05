
import { PAGE } from "@/defaults"
import { MeetingStatus } from "@/types/type"
import {
    parseAsInteger,
    parseAsString,
    parseAsStringEnum,
    useQueryStates
} from "nuqs"

export const useMeetingFilter = () => {

    return useQueryStates({
        search: parseAsString.withDefault("").withOptions({
            clearOnDefault: true
        }),
        page: parseAsInteger.withDefault(PAGE).withOptions({
            clearOnDefault: true
        }),
        status: parseAsStringEnum(Object.values(MeetingStatus)),
        agentId: parseAsString.withDefault("").withOptions({
            clearOnDefault: true
        })
    })
}


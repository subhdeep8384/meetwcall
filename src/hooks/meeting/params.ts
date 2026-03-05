import { PAGE } from "@/defaults"
import { MeetingStatus } from "@/types/type"
import { parseAsStringEnum } from "nuqs"
import { createLoader } from "nuqs/server"
import {
    parseAsInteger,
    parseAsString,
} from "nuqs/server"

export const useMeetingFilterServer = {
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
}
export const loadSearchParams = createLoader(useMeetingFilterServer)

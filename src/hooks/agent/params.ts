import { PAGE } from "@/defaults"
import { createLoader } from "nuqs/server"
import {
    parseAsInteger,
    parseAsString,
} from "nuqs/server"

export const useAgentsFiltersServer = {
    search: parseAsString.withDefault("").withOptions({
        clearOnDefault: true
    }),
    page: parseAsInteger.withDefault(PAGE).withOptions({
        clearOnDefault: true
    })
}
export const loadSearchParams = createLoader(useAgentsFiltersServer)

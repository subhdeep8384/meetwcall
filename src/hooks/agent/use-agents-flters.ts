
import { PAGE } from "@/defaults"
import {
    parseAsInteger,
    parseAsString,
    // useQueryState,
    useQueryStates
} from "nuqs"

export const useAgentsFilters = () => {

    return useQueryStates({
        search: parseAsString.withDefault("").withOptions({
            clearOnDefault: true
        }),
        page: parseAsInteger.withDefault(PAGE).withOptions({
            clearOnDefault: true
        })
    })
}


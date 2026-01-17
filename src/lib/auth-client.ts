import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    // baseURL: "http://localhost:3000"
    // not need as we are in same domian for backend and frontend 
})
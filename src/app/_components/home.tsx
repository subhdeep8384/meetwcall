"use client"
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner';
import { authClient } from '@/lib/auth-client'
import { useRouter } from "next/navigation";
import React from 'react'
import { toast } from 'sonner';

const Home = () => {
    const router = useRouter()
    const { data: session } = authClient.useSession()

    if (!session) {
        return <Spinner />
    }
    return (
        <div>
            welcome to page {session?.user.name}
            <Button onClick={() => {
                authClient.signOut({
                    fetchOptions: {
                        onSuccess: () => {
                            router.push("/sign-in")
                        },
                        onError: (error) => {
                            toast.error(error.error.message)
                        }
                    }
                })
                router.push("/sign-in")
            }}>logout</Button>
        </div>
    )
}

export default Home

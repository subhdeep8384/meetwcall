"use server"
import SignUp from '@/app/_components/authComponents/sign-up'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import React from 'react'


const Page = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!!session) {
        redirect("/")
    }
    return (
        <SignUp />
    )
}

export default Page

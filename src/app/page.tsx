"use server"
import React from 'react'
import Home from './_components/home'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect('/sign-in')
  }
  return (
    <Home />
  )
}

export default Page

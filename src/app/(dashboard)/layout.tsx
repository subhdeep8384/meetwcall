import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'
import DashboardSideBar from '../_components/dashboardComponents/dashboard'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider className='bg-red-500'>
            <DashboardSideBar />
            <main className='flex flex-col h-screen w-screen bg-muted'>
                {children}
            </main>
        </SidebarProvider>
    )
}

export default Layout

import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'
import DashboardSideBar from '../_components/dashboardComponents/dashboard'
import Navbar from '../_components/dashboardComponents/navbar'
// import HomeView from '../_components/homeView'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider className='bg-red-500'>
            {/* <HomeView />  this i have used to check the setup of trpc */}
            <DashboardSideBar />
            <main className='flex flex-col h-screen w-screen bg-muted'>
                <Navbar />
                {children}
            </main>
        </SidebarProvider>
    )
}

export default Layout

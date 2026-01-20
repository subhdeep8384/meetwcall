"use client"
import { Button } from '@/components/ui/button'
import { useSidebar } from '@/components/ui/sidebar'
import { PanelLeftClose, PanelRightClose, SearchIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import DashBoardCammand from './dashBoardCammand'

const Navbar = () => {
    const { state, toggleSidebar, isMobile } = useSidebar();
    const [commandOpen, setCommandOpen] = useState(false)

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setCommandOpen((c) => !c)
            }
        }

        document.addEventListener("keydown", down);

        return () => document.removeEventListener("keydown", down);
    })
    return (

        <>
            <DashBoardCammand open={commandOpen} setOpen={setCommandOpen} />
            <nav className='gap-4 flex items-center px-3 py-3 border border-b-2 bg-background'>
                <Button
                    className='size-9'
                    variant={"outline"}
                    onClick={toggleSidebar}
                >
                    {(isMobile || state === "collapsed") ? <PanelRightClose className='size-5' /> : <PanelLeftClose className='size-5' />}
                </Button>

                <Button
                    className='h-9 w-70 justify-start font-normal text-muted-foreground hover:text-muted-foreground'
                    variant={"outline"}
                    size={"sm"}
                    onClick={() => setCommandOpen((c) => !c)}
                >
                    <SearchIcon />
                    search
                    <kbd
                        className='ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg0muted
                    px-2 font-mono text-[10px] font-medium text-muted-foreground'
                    >
                        <span
                            className='text-xs'>&#8984;</span>k
                    </kbd>

                </Button>
            </nav>
        </>
    )
}

export default Navbar

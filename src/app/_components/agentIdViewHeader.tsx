import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from 'next/link'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import { Button } from '@/components/ui/button'
import { PencilIcon, TrashIcon } from 'lucide-react'
type Props = {
    agentId: string
    agentName: string
    onEdit: () => void
    onRemove: () => void
}

const AgentIdViewHeader = ({
    agentId,
    agentName,
    onEdit,
    onRemove
}: Props) => {
    return (
        <div className='flex items-center justify-between'>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/agents">
                                <Button variant="outline"
                                    className='text-sm w-full m-2 px-3 py-2 bg-slate-800
                                    text-white
                                    '
                                    size="icon-sm">
                                    Go to agents
                                </Button>
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className='px-2' />
                    <BreadcrumbItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button size="icon-sm" variant="outline"
                                    className='w-full px-3 py-2'
                                >
                                    Modify
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuGroup>
                                    <DropdownMenuItem
                                        onClick={onEdit}
                                    >
                                        <PencilIcon className='w-5 h-5' />
                                        Edit
                                        Agent
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={onRemove}
                                    >
                                        <TrashIcon className='w-5 h-5' />
                                        Delete</DropdownMenuItem>
                                    <DropdownMenuItem>GitHub</DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href={`/agents/${agentId}`}>{agentName}</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    {/* <BreadcrumbSeparator /> */}
                    {/* <BreadcrumbItem>
                        <BreadcrumbPage>modify {agentName}</BreadcrumbPage>
                    </BreadcrumbItem> */}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    )
}

export default AgentIdViewHeader

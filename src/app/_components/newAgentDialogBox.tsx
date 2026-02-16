import React from 'react'
import ResponsiveDialog from '@/components/dialog'
import AgentForm from './agentForm';
import { useQueryClient } from '@tanstack/react-query';
// import { trpc } from '@/trpc/server';
import { useTRPC } from '@/trpc/client';

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const NewAgantDialogBox = ({
    open,
    onOpenChange
}: Props) => {
    const trpc = useTRPC()
    const queryClient = useQueryClient()
    return (
        <ResponsiveDialog
            title='Create new agent'
            description='Create a new agent'
            open={open} onOpenChange={onOpenChange}
        >
            <AgentForm
                onSucess={() => {
                    onOpenChange(false)
                    queryClient.invalidateQueries(trpc.agents.getAll.queryOptions())
                }}
                onCancel={() => onOpenChange(false)}
            />
        </ResponsiveDialog>
    )
}

export default NewAgantDialogBox

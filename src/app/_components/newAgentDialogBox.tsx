import React from 'react'
import ResponsiveDialog from '@/components/dialog'
import AgentForm from './agentForm';

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const NewAgantDialogBox = ({
    open,
    onOpenChange
}: Props) => {
    return (
        <ResponsiveDialog
            title='Create new agent'
            description='Create a new agent'
            open={open} onOpenChange={onOpenChange}
        >
            <AgentForm
                onSucess={() => onOpenChange(false)}
                onCancel={() => onOpenChange(false)}
            />
        </ResponsiveDialog>
    )
}

export default NewAgantDialogBox

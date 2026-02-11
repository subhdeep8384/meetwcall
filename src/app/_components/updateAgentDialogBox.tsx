import React from 'react'
import ResponsiveDialog from '@/components/dialog'
import AgentForm from './agentForm';
import { AgentGetOne } from '@/types/type';


interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialValues: AgentGetOne
}

const UpdateAgentDialogBox = ({
    open,
    onOpenChange,
    initialValues
}: Props) => {
    return (
        <ResponsiveDialog
            title='Re-contruct agent'
            description='Modify the agent details'
            open={open} onOpenChange={onOpenChange}
        >
            <AgentForm
                initialValues={initialValues}
                onSucess={() => onOpenChange(false)}
                onCancel={() => onOpenChange(false)}
            />
        </ResponsiveDialog>
    )
}

export default UpdateAgentDialogBox

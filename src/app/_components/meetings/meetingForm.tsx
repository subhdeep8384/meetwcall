"use client"

import { useTRPC } from '@/trpc/client';
import { MeetingGetOne } from '@/types/type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import z from 'zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { meetingsInsertSchema } from '@/meetings/meetingSchema';
import { CommandSelect } from '../general/commandSelect';
import GeneratedAvatar from '../dashboardComponents/generatedAvatar';
import { useState } from 'react';
import NewAgantDialogBox from '../newAgentDialogBox';


interface Props {
    onSucess?: (id?: string) => void;
    onCancel?: () => void;
    initialValues?: MeetingGetOne;
}


const MeetingForm = ({ onSucess, onCancel, initialValues }: Props) => {

    const trpc = useTRPC();
    const queryClient = useQueryClient()
    const [openNewAgentDialog, setOpenNewAgentDialog] = useState(false)
    const agents = useQuery(trpc.agents.getAll.queryOptions())

    const createMeeting = useMutation(trpc.meetings.create.mutationOptions({
        onSuccess: (data) => {
            queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}))
            if (initialValues?.id) {
                queryClient.invalidateQueries(trpc.agents.getOne.queryOptions({ id: initialValues?.id }))
            }
            onSucess?.(data.id)
            toast.success("Meeting created successfully")
        },

        onError: (e) => {
            toast.error(e.message)
            onCancel?.()
        }
    }))

    const updateMeeting = useMutation(trpc.meetings.update.mutationOptions({
        onSuccess: (data) => {
            queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}))
            if (initialValues?.id) {
                queryClient.invalidateQueries(trpc.meetings.getOne.queryOptions({
                    id: initialValues?.id
                }))
            }
            onSucess?.(data.id)

            toast.success("Agent updated successfully")
        },

        onError: (e) => {
            toast.error(e.message)
            onCancel?.()
        }
    }))

    const form = useForm<z.infer<typeof meetingsInsertSchema>>({
        resolver: zodResolver(meetingsInsertSchema),
        defaultValues: {
            name: initialValues?.name ?? "",
            agentId: initialValues?.agentId ?? ""
        }
    })

    const isEdit = !!initialValues?.id

    const isPending = createMeeting.isPending || updateMeeting.isPending;
    const onSubmit = (values: z.infer<typeof meetingsInsertSchema>) => {
        if (isEdit) {
            updateMeeting.mutate({
                ...values,
                id: initialValues?.id
            })
        } else {
            createMeeting.mutate(values)
        }
    }
    return (
        <>
            <NewAgantDialogBox
                open={openNewAgentDialog}
                onOpenChange={setOpenNewAgentDialog}
            />
            <Form {...form}>
                <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
                    <GeneratedAvatar seed={form.watch("name")} className='h-12 w-12 rounded-full' variant='botttsNeutral' />
                    <FormField
                        name='name'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <Input {...field} placeholder='Name' />
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name='agentId'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Agent</FormLabel>
                                <FormControl>
                                    <CommandSelect
                                        options={(agents.data ?? []).map(
                                            (agent) => ({
                                                id: agent.id,
                                                value: agent.id,
                                                children: (
                                                    <div className='flex  items-center gap-x-4'>
                                                        <GeneratedAvatar
                                                            seed={agent.name}
                                                            variant='botttsNeutral'
                                                            className='border size-8'
                                                        />
                                                        <span>{agent.name}</span>
                                                    </div>
                                                )
                                            })
                                        )}
                                        setOpenNewAgentDialog={setOpenNewAgentDialog}
                                        onSelect={field.onChange}
                                        // onSearch={setAgentSearch}
                                        value={field.value}
                                        placeholder='Select an agent'
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div>
                        {onCancel && <Button
                            variant={"ghost"}
                            disabled={isPending}
                            type='button'
                            onClick={() => onCancel()}
                        >Cancel</Button>}
                        <Button disabled={isPending}
                            type='submit'
                        >
                            {isEdit ? "Update" : isPending ? <Spinner /> : "Create"}
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    )
}

export default MeetingForm

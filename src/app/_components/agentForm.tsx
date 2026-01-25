"use client"
import { agentSchema } from '@/agents/agentSchema';
import { useTRPC } from '@/trpc/client';
import { AgentGetOne } from '@/types/type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { useForm } from 'react-hook-form';
import z from 'zod';
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import GeneratedAvatar from './dashboardComponents/generatedAvatar';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';


interface Props {
    onSucess?: () => void;
    onCancel?: () => void;
    initialValues?: AgentGetOne;
}


const AgentForm = ({ onSucess, onCancel, initialValues }: Props) => {

    const trpc = useTRPC();
    const queryClient = useQueryClient()

    const createAgent = useMutation(trpc.agents.create.mutationOptions({
        onSuccess: () => {
            queryClient.invalidateQueries(trpc.agents.getMany.queryOptions())
            if (initialValues?.id) {
                queryClient.invalidateQueries(trpc.agents.getOne.queryOptions({ id: initialValues?.id }))
            }
            onSucess?.()
            toast.success("Agent created successfully")
        },

        onError: (e) => {
            toast.error(e.message)
            onCancel?.()
        }
    }))

    const form = useForm<z.infer<typeof agentSchema>>({
        resolver: zodResolver(agentSchema),
        defaultValues: {
            name: initialValues?.name ?? "",
            instructions: initialValues?.instructions ?? ""
        }
    })

    const isEdit = !!initialValues?.id

    const isPending = createAgent.isPending;
    const onSubmit = (values: z.infer<typeof agentSchema>) => {
        if (isEdit) {
            console.log("update the afent agent")
        } else {
            createAgent.mutate(values)
        }
    }
    return (
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
                    name='instructions'
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Instructions</FormLabel>
                            <Textarea {...field} placeholder='Tell what type of agent you want to create' />
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
    )
}

export default AgentForm

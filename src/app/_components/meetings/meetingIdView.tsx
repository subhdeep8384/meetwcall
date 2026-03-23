"use client"
import React, { useState } from 'react'
import MeetingIdViewHeader from './meetingIdViewHeader'
import { useTRPC } from '@/trpc/client'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useConfirmMessage } from '@/hooks/use-confirm-message'
import UpdateMeetingDialogBox from './updateMeetingDialog'
import Upcomming from './upcomming/upcomming'
import Active from './active/active'

interface Props {
  meetingId: string
}

const MeetingIdView = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient()
  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({
      id: meetingId
    })
  )
  const [ConfirmDialog, confirm] = useConfirmMessage(
    {
      title: "Are you sure you want to delete this meeting?",
      description: "This will delete the meeting and all the associated data"
    }
  )
  const router = useRouter()


  const remove = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({})
        );
        router.push("/meetings")
      },
      onError: (error) => {
        toast.error(error.message)
      }

    })
  )
  const [updateMeetingDiaolog, setUpdateMeetingDialog] = useState(false)
  const handleRemove = async () => {
    const ok = await confirm();
    if (!ok) return;
    await remove.mutate({ id: meetingId })
  }

  const isActive = data.status === "active"
  const isUpcoming = data.status === "upcomming"
  const isCancelled = data.status === "cancelled"
  const isCompleted = data.status === "completed"
  const isProcessing = data.status === "processing"

  return (
    <div className='flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-5'>
      <ConfirmDialog />
      <UpdateMeetingDialogBox
        open={updateMeetingDiaolog}
        onOpenChange={setUpdateMeetingDialog}
        initialValues={data}
      />
      <MeetingIdViewHeader
        meetingId={meetingId}
        meetingName={data.name}
        onEdit={() => setUpdateMeetingDialog(c => !c)}
        onRemove={handleRemove}
      />
      {isCancelled && 
        <div>
            <Active
            meetingId={meetingId}
            />
        </div>
      }
      {isProcessing && <div><Active
        meetingId={meetingId}
      /></div>}
      {isCompleted && <div><Active
        meetingId={meetingId}
      /></div>}
      {isUpcoming && <div><Upcomming
        meetingId={meetingId}
        onCancelMeeting={() => { }}
        isCancelling={false}
      /></div>}
      {isActive && <div><Active
        meetingId={meetingId}
      /></div>}
    </div>
  )
}

export default MeetingIdView

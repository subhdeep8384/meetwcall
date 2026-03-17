"use client"
import React, { useState } from 'react'
import MeetingIdViewHeader from './meetingIdViewHeader'
import { useTRPC } from '@/trpc/client'
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useConfirmMessage } from '@/hooks/use-confirm-message'
import UpdateMeetingDialogBox from './updateMeetingDialog'

interface Props {
    meetingId : string
}

const MeetingIdView = ({meetingId} : Props) => {
  const trpc = useTRPC() ;
  const queryClient = useQueryClient()
  const {data}  = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({
      id : meetingId
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
      onSuccess: () =>{
        queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({}) 
        );
        router.push("/meetings")
      },
      onError:(error ) =>{
        toast.error(error.message)
      }

    })
  )
  const [updateMeetingDiaolog , setUpdateMeetingDialog] = useState(false)
  const handleRemove =async () =>{
    const ok = await confirm();
    if (!ok ) return ;
    await remove.mutate({id : meetingId})
  }
  return (
    <div className='flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-5'>
      <ConfirmDialog/>
      <UpdateMeetingDialogBox 
        open = {updateMeetingDiaolog}
        onOpenChange = {setUpdateMeetingDialog}
        initialValues = {data}
      />
      <MeetingIdViewHeader 
      meetingId={meetingId} 
      meetingName={data.name} 
        onEdit={() => setUpdateMeetingDialog(c => !c)}
        onRemove={handleRemove}
      />
    </div>
  )
}

export default MeetingIdView

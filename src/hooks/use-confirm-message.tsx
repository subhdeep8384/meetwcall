"use client"
import ResponsiveDialog from "@/components/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"


interface Props {
    title: string
    description: string
}
export const useConfirmMessage = ({ title, description }: Props) => {
    const [promise, setPromise] = useState<{
        resolve: (value: boolean) => void
    } | null>(null)

    const confirm = () => {
        return new Promise<boolean>((resolve) => {
            setPromise({ resolve })
        })
    }

    const handleClose = () => {
        promise?.resolve(false)
        setPromise(null)
    }

    const handleConfirm = () => {
        promise?.resolve(true)
        setPromise(null)
    }

    const handleCancel = () => {
        promise?.resolve(false)
        setPromise(null)
    }

    const ConfirmDialog = () => (
        <ResponsiveDialog
            open={promise !== null}
            title={title}
            description={description}
            onOpenChange={handleClose}
        >
            <div className="pt-4 w-full flex flex-row gap-y-2 lg:flex-row gap-x-2 items-center justify-end">
                <Button variant="outline" onClick={handleCancel}>
                    Cancel
                </Button>
                <Button onClick={handleConfirm}>
                    Confirm
                </Button>
            </div>
        </ResponsiveDialog>
    )

    return [ConfirmDialog, confirm] as const
}

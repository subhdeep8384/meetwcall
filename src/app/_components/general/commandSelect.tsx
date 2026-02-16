"use client"
import { ReactNode, useState } from "react";
import { ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandResponsiveDialog,
    CommandList
} from "@/components/ui/command"
import { FormDescription } from "@/components/ui/form";



interface Props {
    options: Array<{
        id: string;
        value: string;
        children: ReactNode;
    }>
    onSelect: (value: string) => void;
    onSearch?: (value: string) => void;
    value: string;
    placeholder?: string;
    isSearchable?: boolean;
    className?: string;
    setOpenNewAgentDialog: (open: boolean) => void
}

export const CommandSelect = ({
    options,
    onSelect,
    onSearch,
    value,
    placeholder = "Select an opttion ",
    // isSearchable,
    setOpenNewAgentDialog,
    className
}: Props) => {

    const [open, setOpen] = useState(false)
    const selectedOption = options.find(option => option.value === value)

    return (
        <>
            <Button
                onClick={() => setOpen(true)}
                type="button"
                variant={"outline"}
                className={cn(
                    "h-9 justify-between font-normal px-2",
                    !selectedOption && "text-muted-foreground",
                    className
                )}
            >
                <div>
                    {selectedOption?.children ?? placeholder}
                </div>
                <ChevronsUpDownIcon className='h-4 w-4' />
            </Button>
            <CommandResponsiveDialog
                open={open}
                onOpenChange={setOpen}
            >
                <CommandInput
                    placeholder="search..."
                    onValueChange={onSearch}
                />
                <CommandList>
                    <CommandEmpty>
                        <span className="flex flex-col text-muted-foreground text-sm ">
                            <FormDescription>
                                No agents ?
                                <Button
                                    type='button'
                                    variant={"ghost"}
                                    className=' hover:underline'
                                    onClick={() => setOpenNewAgentDialog(true)}
                                >
                                    Create new agent
                                </Button>

                            </FormDescription>
                        </span>
                    </CommandEmpty>

                    {options.map((option) => (
                        <CommandItem
                            key={option.id}
                            onSelect={() => {
                                onSelect(option.value)
                                setOpen(false)
                            }
                            }
                        >
                            {option.children}
                        </CommandItem>
                    ))}
                </CommandList>
            </CommandResponsiveDialog >
        </>
    )
}
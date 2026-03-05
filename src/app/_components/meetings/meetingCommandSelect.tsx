import { ReactNode, useState } from "react";
import { ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {

    CommandInput,
    CommandItem,
    CommandResponsiveDialog,
    CommandList
} from "@/components/ui/command"



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
}

export const MeetingCommandSelect = ({
    options,
    onSelect,
    onSearch,
    value,
    placeholder = "Select an option ",
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
                <Button onClick={() => onSelect("")} variant={"outline"} className='text-sm'>
                    clear filters
                </Button>
                <CommandList>


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
"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { AlertCircleIcon } from "lucide-react"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    onRowClick?: (row: TData) => void
}

export function DataTable<TData, TValue>({
    columns,
    data,
    onRowClick,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="relative w-full max-w-full  ">
            <Table className="w-full table-fixed">
                <TableBody>
                    {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                onClick={() => onRowClick?.(row.original)}
                                className="hover:bg-muted/10 cursor-pointer h-20"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell
                                        key={cell.id}
                                        className="p-4 text-sm truncate whitespace-nowrap"
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-screen p-4 text-sm text-muted-foreground text-center"
                            >
                                <EmptyState title="No results" description="You can create a new agent and start talking to them by clicking on new meeting button" />
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}


interface Props {
    title: string;
    description: string
}

const EmptyState = ({
    title,
    description
}: Props) => {
    return (
        <div className='py-4 px-8 flex flex-1   justify-center items-center'>
            <div className='flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm'>
                <AlertCircleIcon className='size-6 animate-spin text-primary' />

                <div className='flex flex-col gap-y-2 text-center '>
                    <h6
                        className='text-lg font-medium'
                    >{title}</h6>
                    <p
                        className='text-sm'
                    >{description}</p>
                </div>
            </div>
        </div>
    )
}
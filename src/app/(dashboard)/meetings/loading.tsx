import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
    return <div className="flex items-center justify-center h-screen w-full">
        <Spinner className="size-20" />
    </div>
}


// import { Card, CardContent, CardHeader } from "@/components/ui/card"
// import { Skeleton } from "@/components/ui/skeleton"
// import { Spinner } from "@/components/ui/spinner"

// export function SkeletonCard() {
//     return (
//         <Card className="w-full max-w-xs">
//             <CardHeader>
//                 <Skeleton className="h-4 w-2/3" />
//                 <Skeleton className="h-4 w-1/2" />
//             </CardHeader>
//             <CardContent>
//                 <Skeleton className="aspect-video w-full" />
//             </CardContent>
//         </Card>
//     )
// }

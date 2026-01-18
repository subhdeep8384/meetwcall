"use client"
import { string, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent } from '@/components/ui/card'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { OctagonAlertIcon } from "lucide-react"
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client"
import { Spinner } from "@/components/ui/spinner"


const formSchema = z.object({
    name: string().min(3, { message: "name should be more than 3 characters" }),
    email: z.string().email(),
    password: z.string().min(1, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string().min(1, { message: "Password doesn't match" }),
}).refine((data) => {
    return data.password === data.confirmPassword
}, {
    message: "Please enter the same password for confirmation",
    path: ["confirmPassword"]
}).refine((data) => {
    return !data.password.toLowerCase().includes(data.name.toLowerCase())
}, {
    message: "Please don't use your name as password",
    path: ["password"]
})

const SignUp = () => {
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    })
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setError(null)
        try {
            setLoading(true)
            await authClient.signUp.email({
                name: data.name,
                email: data.email,
                password: data.password
            }, {
                onSuccess: () => {
                    router.push("/")
                },
                onError: (error) => {
                    setError(error.error.message)
                }
            },
            )
        } catch (_) {
            console.log(_);
        } finally {
            setLoading(false)
        }
    }
    const router = useRouter()
    return (
        <div className='flex flex-col gap-6'>
            <Card className='overflow-hidden p-1'>
                <CardContent className='grid p-0 md:grid-cols-2'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <h1 className="text-2xl font-bold">Welcome to MeetWC
                                    </h1>
                                    <p className="text-muted-foreground text-balance">
                                        Let&apos;s get started
                                    </p>
                                </div>
                                <div className="grid  gap-3 ">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="name"
                                                        placeholder="Enter your name"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        placeholder="Enter you email"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="***********"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Confirm password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="***********"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {!!error && (
                                        <Alert className="bg-destructive/10 border-none">
                                            <OctagonAlertIcon className="h-6 w-6 text-destructive" />
                                            <AlertTitle>{error}</AlertTitle>
                                        </Alert>
                                    )}
                                    <Button
                                        disabled={loading}
                                        type="submit"
                                        className="w-full"
                                    >
                                        {loading ? <Spinner /> : "SignIn"}
                                    </Button>
                                    <div className="after:border-border relative text-center text-sm after:absolute after:insert-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                                        <span>
                                            Or continue with
                                        </span>
                                    </div>
                                    <div className="grid grid-col-1 gap-2 md:grid-cols-3">
                                        <Button
                                            disabled={loading}
                                            variant={"outline"}
                                            type="button"
                                            className="w-full"
                                        >
                                            Google
                                        </Button>
                                        <Button
                                            disabled={loading}
                                            variant={"outline"}
                                            type="button"
                                            className="w-full"
                                        >
                                            facebook
                                        </Button>
                                        <Button
                                            disabled={loading}
                                            variant={"outline"}
                                            type="button"
                                            className="w-full"
                                        >
                                            Github
                                        </Button>
                                    </div>

                                    <div className="flex  gap-1 text-center">
                                        <p className="text-sm flex text-muted-foreground justify-center">a;ready have an account?</p>
                                        <div
                                            hidden={loading}
                                            className="text-sm  underline 
                                            cursor-pointer underline-offset-4  justify-center"
                                            onClick={() => {
                                                router.push("/sign-in")
                                            }}
                                        >
                                            SignIn
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Form>
                    <div
                        className='bg-radial from-green-700 to-green-700 relative hidden md:flex flex-col gap-y-4 items-center justify-center'
                    >
                        <img src={'./logo.svg'}
                            alt='Image'
                            className='w-22 md:w-28'
                        />
                        <p
                            className='text-2xl font-semibold text-white'>
                            MeetWC
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default SignUp

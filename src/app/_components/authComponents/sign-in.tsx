"use client"
import { z } from "zod"
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
import { toast } from "sonner"
import Image from "next/image"



const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, { message: "Password must be at least 8 characters" }),

})

const SignIn = () => {
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setError(null)
        try {
            setLoading(true)
            await authClient.signIn.email({
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

    const onSocialSubmit = async (provider: "github" | "google" | "facebook") => {
        try {
            setLoading(true)
            authClient.signIn.social({
                provider: provider,
                callbackURL: "/"
            })
        } catch (_) { console.log(_) } finally { setLoading(false) }

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
                                    <h1 className="text-2xl font-bold">Welcome to SekTalks
                                    </h1>
                                    <p className="text-muted-foreground text-balance">
                                        Login to your account
                                    </p>
                                </div>
                                <div className="grid gap-3">
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
                                                <FormLabel>password</FormLabel>
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
                                            onClick={async () => {
                                                await onSocialSubmit("google")
                                            }}
                                            disabled={loading}
                                            variant={"outline"}
                                            type="button"
                                            className="w-full"
                                        >
                                            <Image src={"/google.png"} alt={"google"} width={20} height={20} />
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                toast.error("facebook not working yet please choose other methord to sign up")
                                            }}
                                            disabled={loading}
                                            variant={"outline"}
                                            type="button"
                                            className="w-full"
                                        >
                                            <Image src={"/facebook.png"} alt={"facebook"} width={20} height={20} />
                                        </Button>
                                        <Button
                                            onClick={async () => {
                                                await onSocialSubmit("github")
                                            }}
                                            disabled={loading}
                                            variant={"outline"}
                                            type="button"
                                            className="w-full"
                                        >
                                            <Image src={"/github.png"} alt={"github"} width={20} height={20} />
                                        </Button>
                                    </div>

                                    <div hidden={loading} className="flex  gap-1 text-center">
                                        <p className="text-sm flex text-muted-foreground justify-center">Do not have an account?</p>
                                        <div
                                            hidden={loading}
                                            className="text-sm cursor-pointer  underline underline-offset-4  justify-center"
                                            onClick={() => {
                                                router.push("/sign-up")
                                            }}
                                        >
                                            SignUp
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
                            SekTalks
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default SignIn

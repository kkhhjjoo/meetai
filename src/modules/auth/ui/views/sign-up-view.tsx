"use client"

import {z} from 'zod';
import Link from 'next/link';
import {zodResolver} from "@hookform/resolvers/zod";
import { OctagonAlertIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import {authClient} from '@/lib/auth-client'
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";
import {Alert, AlertTitle} from '@/components/ui/alert'
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const formSchema = z.object({
    name: z.string().min(1, {message: "이름을 입력해주세요"}),
    email: z.string().email({
        message: '올바른 이메일을 입력해주세요.'
    }),
    password: z.string().min(1, { message: "비밀번호는 필수입니다."}),
    confirmPassword: z.string().min(1, { message: "비밀번호는 필수입니다."})
})
.refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ["confirmPassword"]
})


export const SignupView = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        setError(null);
        setPending(true);

        authClient.signUp.email(
            {
                name: data.name,
                email: data.email,
                password: data.password
            },
            {
                onSuccess: () => {
                    setPending(false);
                    router.push("/");
                },
                onError: ({error}) => {
                    setError(error.message)
                }
            }
        );

        
    }
    return (
        <div className="flex flex-col gap-6">
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='p-6 md:p-8'>
                            <div className='flex flex-col gap-6'>
                                <div className='flex flex-col items-center text-center'>
                                    <h1 className='text-2xl font-bold'>시작합니다.</h1>
                                    <p className='text-muted-foreground text-balance'>회원 생성을 하세요</p>
                                </div>
                                <div className='grid gap-3'>
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>이름</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        placeholder="m"
                                                        {...field}
                                                     />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='grid gap-3'>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>이메일</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        placeholder="m@example.com"
                                                        {...field}
                                                     />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='grid gap-3'>
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>비밀번호</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder='********'
                                                        {...field}
                                                     />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='grid gap-3'>
                                    <FormField
                                        control={form.control}
                                        name="confirmPassword"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>비밀번호 확인</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder='********'
                                                        {...field}
                                                     />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                {!!error && (
                                    <Alert className='bg-destructive/10 border-none'>
                                        <OctagonAlertIcon className='h-4 w-4 !text-destructive' />
                                        <AlertTitle>{error}</AlertTitle>
                                    </Alert>
                                )}
                                <Button
                                type='submit'
                                disabled={pending}
                                className='w-full'
                                >
                                    회원가입
                                </Button>
                            </div>
                            <div className='text-center text-sm'>
                                    이미 계정이 있나요??{" "}
                                <Link href="/login" className='underline underline-offset-4'>로그인하기</Link>
                             </div>
                        </form>
                    </Form>
                    <div className="bg-radial from-green-700 to-green-900 relative hidden md:flex flex-col gap-y-4 items-center justify-center">
                        <p className="text-2xl font-semibold text-white">
                            <img src="/logo.svg" alt="Image" className="h-[92px] w-[92px]" />
                            Meet.AI
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
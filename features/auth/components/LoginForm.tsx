'use client'

import React, { useState, useTransition } from 'react'
import { CardWrapper } from './cardWrapper'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'

import { useForm } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema } from '../schemas/LoginSchema'
import { Button } from '@/components/ui/button'
import { ErrorMessage, SuccessMessage } from './ui'
import { login } from '@/actions/login'

type LoginFormData = z.infer<typeof LoginSchema>

export const LoginForm = () => {
	const [success, setSuccess] = useState('')
	const [error, setError] = useState('')
	const [isPending, startTransition] = useTransition()

	const form = useForm<LoginFormData>({
		resolver: zodResolver(LoginSchema),
		defaultValues: { email: '', password: '' },
	})

	const onSubmit = (values: LoginFormData) => {
		setSuccess('')
		setError('')
		startTransition(() => {
			login(values)
				.then(data => {
					if (data?.error) {
						form.reset()
						setError(data.error)
					}

					if (data?.success) {
						form.reset()
						setSuccess(data.success)
					}
				})
				.catch(() => {
					setError('Something went wrong')
				})
		})
	}

	return (
		<CardWrapper
			headerLabel='Welcome back'
			backButtonLabel="Don't have an account?"
			backButtonHref='/auth/register'
			showSocial>
			<Form {...form}>
				<form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor='email'>Email</FormLabel>
								<FormControl>
									<Input
										{...field}
										type='email'
										placeholder='joedoe@gmail.com'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor='password'>Password</FormLabel>
								<FormControl>
									<Input {...field} type='password' placeholder='*********' />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div>
						<SuccessMessage message={success} />
						<ErrorMessage message={error} />
					</div>
					<Button disabled={isPending} type='submit' className='w-full'>
						Login
					</Button>
				</form>
			</Form>
		</CardWrapper>
	)
}

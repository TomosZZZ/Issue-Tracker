'use client'

import React, { useState, useTransition } from 'react'
import { CardWrapper } from './ui/cardWrapper'
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

import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterSchema } from '../schemas/RegisterSchema'
import { Button } from '@/components/ui/button'

import { RegisterFormData } from '../types'
import { ErrorMessage, SuccessMessage } from './ui'
import { register } from '@/features/auth/actions'

export const RegisterForm = () => {
	const [success, setSuccess] = useState('')
	const [error, setError] = useState('')
	const [isPending, startTransition] = useTransition()

	const form = useForm<RegisterFormData>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: { email: '', password: '', name: '' },
	})

	const onSubmit = async (values: RegisterFormData) => {
		setSuccess('')
		setError('')
		startTransition(() => {
			register(values)
				.then(data => {
					if (data?.success) {
						form.reset()
						setSuccess(data.success)
					}
				})
				.catch(error => {
					setError(error.message || 'Something went wrong')
				})
		})
	}

	return (
		<CardWrapper
			headerLabel='Sign up'
			bottomButtonLabel='Already have an account?'
			bottomButtonHref='/auth/login'
			showSocial>
			<Form {...form}>
				<form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor='name'>Name</FormLabel>
								<FormControl>
									<Input {...field} placeholder='Joe Doe' />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
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
						Register
					</Button>
				</form>
			</Form>
		</CardWrapper>
	)
}

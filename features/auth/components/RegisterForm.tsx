'use client'

import React, { useState } from 'react'
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

import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterSchema } from '../schemas/RegisterSchema'
import { Button } from '@/components/ui/button'

import { RegisterFormData } from '../types'
import { useRegister } from '../api/register'
import { ErrorMessage, SuccessMessage } from './ui'

export const RegisterForm = () => {
	const [success, onSuccess] = useState('')
	const [error, onError] = useState('')

	const form = useForm<RegisterFormData>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: { email: '', password: '', name: '' },
	})

	const { mutate, isPending } = useRegister()

	const onSubmit = async (values: RegisterFormData) => {
		onSuccess('')
		onError('')
		try {
			mutate(values, {
				onSettled: data => {
					console.log(!!data?.error)
					if (data?.success) {
						onSuccess(data.success)
					}
					if (data?.error) {
						onError(data.error)
					}
				},
			})
		} catch {
			onError('Something went wrong')
		}
	}

	return (
		<CardWrapper
			headerLabel='Sign up'
			backButtonLabel='Already have an account?'
			backButtonHref='/auth/login'
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

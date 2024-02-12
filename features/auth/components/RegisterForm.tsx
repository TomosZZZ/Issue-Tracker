'use client'

import React from 'react'
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
import { RegisterSchema } from '../schemas/RegisterSchema'
import { Button } from '@/components/ui/button'

type RegisterFormData = z.infer<typeof RegisterSchema>

export const RegisterForm = () => {
	const form = useForm<RegisterFormData>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: { email: '', password: '', name: '' },
	})

	const onSubmit = (values: RegisterFormData) => {
		console.log(values)
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
					<Button type='submit' className='w-full'>
						Login
					</Button>
				</form>
			</Form>
		</CardWrapper>
	)
}

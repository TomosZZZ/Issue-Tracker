'use client'

import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { EditPasswordSchema } from '../../schemas'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { changePassword, getUserById } from '../../actions'
import { signOut, useSession } from 'next-auth/react'
import { useToast } from '@/components/ui/use-toast'

type ChangePasswordData = z.infer<typeof EditPasswordSchema>

export const ChangePasswordPanel = () => {
	const [password, setPassword] = useState<string | null>('')
	const [isFetchPasswordPending, startFetchPasswordTransition] = useTransition()

	const form = useForm<ChangePasswordData>({
		resolver: zodResolver(EditPasswordSchema),
		defaultValues: {
			password: '',
			newPassword: '',
			passwordConfirmation: '',
		},
	})
	const { toast } = useToast()
	const {
		handleSubmit,
		formState: { errors },
		reset,
	} = form

	const { data: session } = useSession()
	const currentUserId = session?.user?.id
	useEffect(() => {
		const fetchUser = async () => {
			if (!currentUserId) {
				return
			}
			const user = await getUserById(currentUserId)
			if (user?.password === undefined) return
			setPassword(user?.password)
		}
		startFetchPasswordTransition(() => {
			fetchUser().then().catch()
		})
	}, [currentUserId])

	const onSubmit = async (data: ChangePasswordData) => {
		if (!password) return
		const oldPasswordIsValid = await bcrypt.compare(data.password, password)
		if (!oldPasswordIsValid) {
			toast({
				title: 'Ooops! Something went wrong',
				description: 'Old password is incorrect',
				variant: 'destructive',
			})
			reset()
			return
		}
		if (data.newPassword === data.password) {
			toast({
				title: 'Ooops! Something went wrong',
				description: 'New password must be different from old password',
				variant: 'destructive',
			})
			reset()
			return
		}
		if (!currentUserId) return
		changePassword({ ...data, id: currentUserId })
			.then(data => {
				if (data.success) {
					toast({
						title: 'Success!!',
						description: data.success || 'Password changed successfully',
					})
				}
			})
			.catch(error => {
				toast({
					title: 'Ooops! Something went wrong',
					description: error || 'Password change failed',
					variant: 'destructive',
				})
			})
		reset()
		signOut()
	}
	return (
		<Card className='shadow-xl shadow-violet-300 flex  align-middle flex-col'>
			<CardHeader>
				<h1 className='text-center w-full py-4 text-2xl font-bold border-b-2 border-violet-600'>
					Edit Profile
				</h1>
			</CardHeader>
			{!isFetchPasswordPending && password === '' && (
				<h3 className='text-center text-destructive text-lg my-5'>
					Could not fetch profile data
				</h3>
			)}
			{!isFetchPasswordPending && password === null && (
				<h3 className='text-center text-destructive text-lg my-5'>
					Can&apos;t change password. You are logged in with Google or Github.
				</h3>
			)}
			{isFetchPasswordPending && (
				<div className='flex items-center my-5 justify-center'>
					<LoadingSpinner size={30} />
				</div>
			)}
			{password && !isFetchPasswordPending && (
				<CardContent>
					<Form {...form}>
						<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
							<FormField
								name='password'
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor='password'>Old Password</FormLabel>
										<FormControl>
											<Input {...field} type='password' />
										</FormControl>
										<FormMessage>
											{errors.password && <p>{errors.password.message}</p>}
										</FormMessage>
									</FormItem>
								)}
							/>
							<FormField
								name='newPassword'
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor='image'>New Password</FormLabel>
										<FormControl>
											<Input {...field} type='password' />
										</FormControl>
										<FormMessage>
											{errors.newPassword && (
												<p>{errors.newPassword.message}</p>
											)}
										</FormMessage>
									</FormItem>
								)}
							/>
							<FormField
								name='passwordConfirmation'
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor='image'>Confirm Password</FormLabel>
										<FormControl>
											<Input {...field} type='password' />
										</FormControl>
										<FormMessage>
											{errors.passwordConfirmation && (
												<p>{errors.passwordConfirmation.message}</p>
											)}
										</FormMessage>
									</FormItem>
								)}
							/>
							<div className='flex items-center justify-center'>
								<Button
									size={'lg'}
									className='bg-violet-700 hover:bg-violet-900'
									type='submit'>
									Submit
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			)}
		</Card>
	)
}

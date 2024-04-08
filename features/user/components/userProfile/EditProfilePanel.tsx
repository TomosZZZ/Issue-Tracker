'use client'

import { Card, CardHeader, CardContent } from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { EditProfileSchema } from '../../schemas'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { signIn, useSession } from 'next-auth/react'
import { useEffect, useState, useTransition } from 'react'
import { editUser, getUserById } from '../../actions'
import { User } from '../../types'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { useToast } from '@/components/ui/use-toast'

type EditProfileFormData = z.infer<typeof EditProfileSchema>

export const EditProfilePanel = () => {
	const [user, setUser] = useState<User | null>()
	const [isFetchUserPending, startFetchUserTransition] = useTransition()

	const { toast } = useToast()

	const form = useForm<EditProfileFormData>({
		resolver: zodResolver(EditProfileSchema),
	})
	const {
		handleSubmit,
		formState: { errors },
	} = form

	const { data: session, update } = useSession()
	const currentUserId = session?.user?.id

	useEffect(() => {
		const fetchUser = async () => {
			if (!currentUserId) {
				return
			}
			const user = await getUserById(currentUserId)
			setUser(user)
		}
		startFetchUserTransition(() => {
			fetchUser().then().catch()
		})
	}, [currentUserId])

	const onSubmit = async (data: EditProfileFormData) => {
		console.log(data)
		if (!currentUserId) return
		editUser({ name: data.name, image: data.image || '' }, currentUserId)
			.then(resData => {
				toast({
					title: 'Success!!',
					description: resData || 'Profile updated successfully',
				})
				update()
				signIn('credentials', {
					...session,
					user: { ...session.user, ...data },
				})
				location.reload()
			})
			.catch(err => {
				toast({
					title: 'Error!!',
					description: err || 'Something went wrong',
					variant: 'destructive',
				})
			})
	}
	return (
		<Card className='shadow-xl shadow-violet-300 flex  align-middle flex-col'>
			<CardHeader>
				<h1 className='text-center w-full py-4 text-2xl font-bold border-b-2 border-violet-600'>
					Edit Profile
				</h1>
			</CardHeader>
			{!isFetchUserPending && !user && (
				<h3 className='text-center text-destructive text-lg my-5'>
					Could not fetch profile data
				</h3>
			)}
			{isFetchUserPending && (
				<div className='flex items-center my-5 justify-center'>
					<LoadingSpinner size={30} />
				</div>
			)}
			{user && !isFetchUserPending && (
				<CardContent>
					<Form {...form}>
						<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
							<FormField
								name='name'
								defaultValue={user.name}
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor='name'>Name</FormLabel>
										<FormControl>
											<Input {...field} type='text' />
										</FormControl>
										<FormMessage>
											{errors.name && <p>{errors.name.message}</p>}
										</FormMessage>
									</FormItem>
								)}
							/>
							<FormField
								name='image'
								defaultValue={user.image || ''}
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor='image'>Image</FormLabel>
										<FormControl>
											<Input {...field} type='text' />
										</FormControl>
										<FormMessage>
											{errors.image && <p>{errors.image.message}</p>}
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

'use client'
import React, { useEffect, useState, useTransition } from 'react'
import { Form } from '@/components/ui/form'
import { CreateIssueSchema } from '../schemas'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { set, z } from 'zod'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { createIssue } from '@/features/issue/actions'
import { Status } from '../types'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { getUsers } from '@/features/user/actions'
import { User } from '@/features/user/types'
import { MultiSelect } from '@/shared/components/MultiSelect'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { useSession } from 'next-auth/react'

type CreateIssueFormData = z.infer<typeof CreateIssueSchema>

export const NewIssueForm = () => {
	const [isPending, startTransition] = useTransition()
	const [friends, setFriends] = useState<User[]>([])
	const [friendsError, setFriendsError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const form = useForm<CreateIssueFormData>({
		resolver: zodResolver(CreateIssueSchema),
	})

	const { data: session } = useSession()
	const currentUserId = session?.user?.id

	useEffect(() => {
		const fetchUsers = async () => {
			const users = await getUsers()
			if (!currentUserId) return
			const currentUserFriends =
				users
					.find(user => user.id === currentUserId)
					?.friends.map(friend => friend.friendId) ?? []
			const friends = users.filter(user => currentUserFriends.includes(user.id))
			setFriends(friends)
		}
		setLoading(true)
		fetchUsers()
			.then()
			.catch(err => {
				setFriendsError(err.message || 'Could not fetch users.')
			})
		setLoading(false)
	}, [currentUserId])
	const { toast } = useToast()
	const router = useRouter()

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = form
	const onSubmit = async (data: CreateIssueFormData) => {
		const users = data.users?.map(user => ({ userId: user.value })) || []

		startTransition(() => {
			if (!currentUserId) return
			createIssue({
				...data,
				status: 'OPEN' as Status,
				users,
				creatorId: currentUserId,
			}).then(data => {
				if (data?.success) {
					toast({
						title: 'Success!',
						description: 'Creating issue succeed.',
					})
					router.replace('/issues')
				}
				if (data?.error) {
					toast({
						title: 'Error',
						description: data.error,
						variant: 'destructive',
					})
				}
			})
		})
	}

	const userSelectOptions = friends.map(user => ({
		label: user.name || '',
		value: user.id,
	}))

	return (
		<Card className='w-[80%] flex justify-center shadow-xl shadow-violet-200 lg:w-[60%]'>
			<Form {...form}>
				<form
					className='p-4 w-3/4 flex flex-col space-y-8 '
					onSubmit={handleSubmit(onSubmit)}>
					<h1 className='text-2xl text-center font-bold '>Create New Issue</h1>
					<FormField
						control={control}
						name='title'
						defaultValue={''}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-md sm:text-lg' htmlFor='title'>
									Title
								</FormLabel>
								<FormControl>
									<Input
										id='title'
										className='text-xs sm:text-lg'
										placeholder='Issue Title:'
										{...field}
									/>
								</FormControl>
								{errors.title && (
									<p className=' text-red-600 text-sm font-light'>{`${errors.title.message}`}</p>
								)}
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name='description'
						defaultValue={''}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-md sm:text-lg' htmlFor='description'>
									Description
								</FormLabel>
								<FormControl>
									<Textarea
										id='description'
										className='text-xs sm:text-lg'
										placeholder='Issue Description:'
										{...field}
									/>
								</FormControl>
								{errors.description && (
									<p className=' text-red-600 text-sm font-light'>{`${errors.description.message}`}</p>
								)}
							</FormItem>
						)}
					/>
					{!friendsError && (
						<>
							<MultiSelect
								label='Friends'
								name='users'
								control={control}
								isMulti={true}
								isSearchable={true}
								options={userSelectOptions}
							/>
							{friends.length == 0 && (
								<div className='text-center'>
									<p>No friends found</p>
								</div>
							)}
						</>
					)}

					{loading && (
						<div className='flex space-x-5 justify-center'>
							<p>Fetching users</p>
							<LoadingSpinner />
						</div>
					)}

					<div className='text-center mt-4'>
						<Button
							disabled={isPending}
							className=' bg-violet-600  text-white text-md sm:text-lg font-medium hover:bg-violet-800'
							type='submit'
							variant={'secondary'}>
							Create
						</Button>
					</div>
				</form>
			</Form>
		</Card>
	)
}

'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { addFriend, getUserById } from '@/features/user/actions'
import { deleteInvitation } from '@/features/user/actions/invitations/deleteInvitation'
import { Invitation } from '@/features/user/types/Invitation'
import { useEffect, useState, useTransition } from 'react'
import { User } from '@/features/user/types/User'
import React from 'react'
import { FaTrash, FaUser, FaCheck } from 'react-icons/fa'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { on } from 'events'

interface RequestListItemProps {
	request: Invitation
	currentUser: User
	onRefreshRequests: (id: string) => void
}

export const RequestListItem = ({
	request: { senderId, id },
	currentUser,
	onRefreshRequests,
}: RequestListItemProps) => {
	const { toast } = useToast()
	const [rejectIsPending, startRejectTransition] = useTransition()
	const [acceptIsPending, startAcceptTransition] = useTransition()
	const [sender, setSender] = useState<User | null>(null)

	useEffect(() => {
		const getSender = async () => {
			const sender = await getUserById(senderId)
			setSender(sender)
		}

		getSender()
			.then()
			.catch(err => {
				toast({
					title: 'Error',
					description: err.message || 'Something went wrong',
					duration: 3000,
				})
			})
	}, [senderId, toast])

	const rejectInvitationHandler = () => {
		startRejectTransition(() => {
			deleteInvitation(id)
				.then(data => {
					if (data.success) {
						toast({
							title: 'Success!!',
							description: data.success || 'Invitation deleted',
							duration: 3000,
						})
						onRefreshRequests(id)
					}
				})
				.catch(err => {
					toast({
						title: 'Error',
						description: err.message || 'Something went wrong',
						duration: 3000,
					})
				})
		})
	}

	const acceptInvitationHandler = () => {
		startAcceptTransition(() => {
			deleteInvitation(id)
				.then()
				.catch(() => {
					toast({
						title: 'Error',
						description: 'Something went wrong',
						duration: 3000,
					})
				})
			addFriend(currentUser.id, senderId)
				.then(data => {
					if (data.success) {
						toast({
							title: 'Success!!',
							description: data.success || 'Friend added',
							duration: 3000,
						})
						onRefreshRequests(id)
					}
				})
				.catch(err => {
					toast({
						title: 'Error',
						description: err.message || 'Something went wrong',
						duration: 3000,
					})
				})
		})
	}

	return (
		<li className='flex justify-between py-3'>
			{sender ? (
				<>
					<div className='flex items-center space-x-5'>
						<Avatar className='w-[30px] h-[30px] sm:w-[40px] sm:h-[40px]'>
							{sender.image && <AvatarImage src={sender.image} />}
							<AvatarFallback>
								<FaUser />
							</AvatarFallback>
						</Avatar>
						<p className=' text-md sm:text-lg'>{sender.name}</p>
					</div>
					<div className='space-x-2'>
						<Button
							disabled={rejectIsPending || acceptIsPending}
							onClick={acceptInvitationHandler}
							size={'sm'}
							className='hover:bg-emerald-900 bg-emerald-500'>
							<FaCheck />
						</Button>
						<Button
							disabled={acceptIsPending || rejectIsPending}
							onClick={rejectInvitationHandler}
							size={'sm'}
							className='hover:bg-red-900 bg-red-700'>
							<FaTrash />
						</Button>
					</div>
				</>
			) : (
				<div className='flex justify-center w-full'>
					<LoadingSpinner />
				</div>
			)}
		</li>
	)
}

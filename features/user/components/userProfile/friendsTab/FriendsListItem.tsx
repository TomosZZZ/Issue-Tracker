'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { createInvitation, deleteFriend } from '@/features/user/actions'
import { User } from '@/features/user/types/User'
import { Invitation } from '@prisma/client'

import React, { useState, useTransition } from 'react'
import { FaTrash, FaUser, FaUserClock, FaCheck, FaPlus } from 'react-icons/fa'

interface FriendsListItemProps {
	user: User
	variant: 'friends' | 'add'
	currentUserId: string
	invitations?: Invitation[]
	onRefreshUsers?: () => void
	filter?: string
}

export const FriendsListItem = ({
	user: { name, image, id },
	variant,
	currentUserId,
	invitations,
	onRefreshUsers,
	filter,
}: FriendsListItemProps) => {
	const { toast } = useToast()
	const [isPending, startTransition] = useTransition()

	//Check if this user has already been invited
	const [pendingInvitation, setPendingInvitation] = useState(
		!!invitations?.find(
			invitation =>
				invitation.recieverId === id && invitation.senderId === currentUserId
		)
	)

	//Check if this user has already sent an invitation to us
	const invitationToAccept = invitations?.find(
		invitation =>
			invitation.senderId === id && invitation.recieverId === currentUserId
	)
	if (invitationToAccept) return null
	if (filter === 'pending' && !pendingInvitation) return null
	if (filter === 'add' && pendingInvitation) return null

	const addFriendHandler = () => {
		createInvitation({ senderId: currentUserId, recieverId: id })
			.then(async data => {
				if (data.success) {
					toast({
						title: 'Success!!',
						description: data.success || 'Invitation sent',
						duration: 3000,
					})
				}
				setPendingInvitation(true)
			})
			.catch(err => {
				toast({
					title: 'Error',
					description: err.message || 'Something went wrong',
					duration: 3000,
				})
			})
	}

	const deleteFriendHandler = async () => {
		startTransition(async () => {
			deleteFriend(currentUserId, id)
				.then(data => {
					if (data.success) {
						toast({
							title: 'Success!!',
							description: data.success || 'Friend deleted',
							duration: 3000,
						})
					}
				})
				.catch(err => {
					toast({
						title: 'Error',
						description: err || 'Something went wrong',
						duration: 3000,
					})
				})
		})
		onRefreshUsers && onRefreshUsers()
	}

	let button = (
		<Button
			size={'sm'}
			onClick={deleteFriendHandler}
			className='hover:bg-red-900 bg-red-700'>
			<FaTrash />
		</Button>
	)

	if (variant === 'add') {
		button = (
			<div className='flex items-center space-x-4'>
				{pendingInvitation && (
					<p className='sm:text-sm text-xs font-light italic'>
						Invitation sent
					</p>
				)}

				{!pendingInvitation && <p className='text-sm font-light italic'>Add</p>}
				<Button
					size={'sm'}
					className={`${
						pendingInvitation
							? 'bg-sky-500'
							: 'hover:bg-emerald-900 bg-emerald-500'
					} `}
					onClick={addFriendHandler}
					disabled={pendingInvitation || isPending}>
					{!pendingInvitation && <FaPlus />}
					{pendingInvitation && <FaUserClock />}
				</Button>
			</div>
		)
	}

	return (
		<li className='flex justify-between py-3'>
			<div className='flex items-center space-x-5'>
				<Avatar className='w-[30px] h-[30px] sm:w-[40px] sm:h-[40px]'>
					{image && name && <AvatarImage src={image} alt={name} />}
					<AvatarFallback>
						<FaUser />
					</AvatarFallback>
				</Avatar>
				<p className='text-md sm:text-lg'>{name}</p>
			</div>
			{button}
		</li>
	)
}

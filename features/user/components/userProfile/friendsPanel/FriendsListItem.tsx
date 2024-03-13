'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import {
	createInvitation,
	deleteFriend,
	deleteInvitation,
} from '@/features/user/actions'
import { addFriend } from '@/features/user/actions/friends/addFriend'
import { User } from '@/features/user/types/User'
import { Invitation } from '@prisma/client'
import { on } from 'events'

import React, { useState, useTransition } from 'react'
import {
	FaTrash,
	FaUser,
	FaUserClock,
	FaUserCheck,
	FaCheck,
} from 'react-icons/fa'

interface FriendsListItemProps {
	user: User
	variant: 'friends' | 'add'
	currentUserId: string
	invitations?: Invitation[]
	onRefreshUsers?: () => void
}

export const FriendsListItem = ({
	user: { name, image, id },
	variant,
	currentUserId,
	invitations,
	onRefreshUsers,
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

	const acceptInvitationHandler = () => {
		startTransition(() => {
			if (!invitationToAccept) return
			deleteInvitation(invitationToAccept.id)
				.then()
				.catch(() => {
					toast({
						title: 'Error',
						description: 'Something went wrong',
						duration: 3000,
					})
					return
				})
			addFriend(currentUserId, id)
				.then(data => {
					if (data.success) {
						toast({
							title: 'Success!!',
							description: data.success || 'Friend added',
							duration: 3000,
						})
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
		onRefreshUsers && onRefreshUsers()
	}
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
					<p className='text-sm font-light italic'>Invitation sent</p>
				)}
				{invitationToAccept && (
					<p className='text-sm font-light italic'>Accept</p>
				)}
				<Button
					size={'sm'}
					className={`${
						pendingInvitation ? 'bg-sky-700' : 'bg-sky-400 hover:bg-sky-500'
					} ${invitationToAccept && 'hover:bg-emerald-900 bg-emerald-500'} `}
					onClick={
						invitationToAccept ? acceptInvitationHandler : addFriendHandler
					}
					disabled={pendingInvitation || isPending}>
					{!pendingInvitation && !invitationToAccept && <FaUserCheck />}
					{invitationToAccept && <FaCheck />}
					{pendingInvitation && <FaUserClock />}
				</Button>
			</div>
		)
	}

	return (
		<li className='flex justify-between py-3'>
			<div className='flex items-center space-x-5'>
				<Avatar>
					{image && <AvatarImage src={image} />}
					<AvatarFallback>
						<FaUser />
					</AvatarFallback>
				</Avatar>
				<p className='text-lg'>{name}</p>
			</div>
			{button}
		</li>
	)
}

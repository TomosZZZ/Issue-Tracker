'use client'

import React, { useEffect, useState, useTransition } from 'react'
import { FriendsListItem } from './FriendsListItem'
import { User } from '@/features/user/types/User'
import { getUsers } from '@/features/user/actions'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { Invitation } from '@/features/user/types/Invitation'
import { set } from 'zod'
import { get } from 'http'
import { getInvitations } from '@/features/user/actions/invitations/getInvitations'
import { PaginationBar, Searchbar } from '@/shared'

interface AddFriendProps {
	currentUserId: string
}

export const AddFriend = ({ currentUserId }: AddFriendProps) => {
	const [isPending, startTransition] = useTransition()
	const [users, setUsers] = useState<User[]>([])
	const [currentUser, setCurrentUser] = useState<User | null>(null)
	const [invitations, setInvitations] = useState<Invitation[]>([])

	const [currentPage, setCurrentPage] = useState(1)
	const [search, setSearch] = useState('')

	useEffect(() => {
		const fetchUsers = async () => {
			startTransition(async () => {
				const fetchedUsers = await getUsers()
				const user = fetchedUsers.find(user => user.id === currentUserId)

				const invitations = await getInvitations()

				if (user) {
					setCurrentUser(user)
				}
				setInvitations(invitations)
				setUsers(fetchedUsers)
			})
		}
		fetchUsers().then().catch()
	}, [currentUserId])

	const refreshUsersHandler = async () => {
		const fetchedUsers = await getUsers()
		const user = fetchedUsers.find(user => user.id === currentUserId)
		if (user) {
			setCurrentUser(user)
		}
		setUsers(fetchedUsers)
	}

	const friends = currentUser?.friends.map(friend => friend.friendId) || []

	const filteredUsers = users.filter(user => {
		return (
			!friends.includes(user.id) &&
			user.id !== currentUserId &&
			user.name?.toLowerCase().includes(search.toLowerCase())
		)
	})

	const itemsPerPage = 5
	const lastItemIndex = currentPage * itemsPerPage
	const firstItemIndex = lastItemIndex - itemsPerPage

	const currentUsers = filteredUsers.slice(firstItemIndex, lastItemIndex)

	return (
		<>
			{isPending && (
				<div className='w-full flex justify-center'>
					<LoadingSpinner />
				</div>
			)}
			{!isPending && filteredUsers.length === 0 && (
				<div className='w-full text-lg text-center mt-5'>No users found</div>
			)}
			{!isPending && filteredUsers.length > 0 && (
				<div className='space-y-6 py-5'>
					<Searchbar onSetSearch={setSearch} />
					<div className='h-[2px] rounded-sm mb-5 mt-5 opacity-30  bg-violet-500'></div>
					<ul className=' divide-y-2'>
						{currentUsers.map(user => (
							<FriendsListItem
								key={user.id}
								user={user}
								variant='add'
								currentUserId={currentUserId}
								invitations={invitations}
								onRefreshUsers={refreshUsersHandler}
							/>
						))}
					</ul>
				</div>
			)}
			{filteredUsers.length > itemsPerPage && (
				<PaginationBar
					itemsPerPage={itemsPerPage}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					totalItems={filteredUsers.length}
				/>
			)}
		</>
	)
}

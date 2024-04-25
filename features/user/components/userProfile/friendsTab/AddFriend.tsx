'use client'

import React, { useEffect, useState, useTransition } from 'react'
import { FriendsListItem } from './FriendsListItem'
import { User } from '@/features/user/types/User'
import { getUsers } from '@/features/user/actions'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { Invitation } from '@/features/user/types/Invitation'
import { getInvitations } from '@/features/user/actions/invitations/getInvitations'
import { PaginationBar, Searchbar } from '@/shared'
import { AddFriendFilter } from './AddFriendFilter'
import { paginationHandler } from '@/utils'

interface AddFriendProps {
	currentUserId: string
}

const ITEMS_PER_PAGE = 5

export const AddFriend = ({ currentUserId }: AddFriendProps) => {
	const [isPending, startTransition] = useTransition()
	const [users, setUsers] = useState<User[]>([])
	const [currentUser, setCurrentUser] = useState<User | null>(null)
	const [invitations, setInvitations] = useState<Invitation[]>([])
	const [filter, setFilter] = useState('all')

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
		fetchUsers()
			.then()
			.catch(err => {
				return (
					<div>
						<p>{err.message || 'Something went wrong'}</p>
					</div>
				)
			})
	}, [currentUserId])

	const refreshUsersHandler = async () => {
		const fetchedUsers = await getUsers()
		const user = fetchedUsers.find(user => user.id === currentUserId)
		if (user) {
			setCurrentUser(user)
		}
		setUsers(fetchedUsers)
	}
	const getFilter = (filter: string) => {
		setFilter(filter)
	}
	const friends = currentUser?.friends.map(friend => friend.friendId) || []
	const sentInvitation =
		currentUser?.sentInvitations.map(invitation => invitation.recieverId) || []
	const recievedInvitation =
		currentUser?.recievedInvitations.map(invitation => invitation.senderId) ||
		[]
	const filteredUsers = users.filter(user => {
		return (
			!friends.includes(user.id) &&
			!sentInvitation.includes(user.id) &&
			!recievedInvitation.includes(user.id) &&
			user.id !== currentUserId &&
			user.name?.toLowerCase().includes(search.toLowerCase())
		)
	})

	const currentUsers = paginationHandler<User>({
		currentPage,
		itemsPerPage: ITEMS_PER_PAGE,
		paginatedItems: filteredUsers,
	})

	return (
		<>
			<div className='flex justify-between py-3'>
				<Searchbar className='w-3/5' handleSearchChange={setSearch} />
				<AddFriendFilter
					className=' min-w-[100px] sm:min-w-[130px] w-[20%]'
					onFriendFilterChange={getFilter}
				/>
			</div>
			<div className='h-[2px] w-full rounded-sm mb-5 mt-5 opacity-30  bg-violet-500'></div>
			{isPending && (
				<div className='w-full flex justify-center'>
					<LoadingSpinner />
				</div>
			)}
			{!isPending && filteredUsers.length === 0 && (
				<div className='w-full text-lg text-center mt-5'>No users found</div>
			)}

			{!isPending && filteredUsers.length > 0 && (
				<div className='space-y-6'>
					<ul className=' divide-y-2'>
						{currentUsers.map(user => (
							<FriendsListItem
								key={user.id}
								user={user}
								variant='add'
								currentUserId={currentUserId}
								invitations={invitations}
								onRefreshUsers={refreshUsersHandler}
								filter={filter}
							/>
						))}
					</ul>
				</div>
			)}
			{filteredUsers.length > ITEMS_PER_PAGE && (
				<PaginationBar
					itemsPerPage={ITEMS_PER_PAGE}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					totalItems={filteredUsers.length}
				/>
			)}
		</>
	)
}

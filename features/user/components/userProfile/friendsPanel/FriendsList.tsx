'use client'

import React, { useEffect, useState } from 'react'

import { getUserById, getUsers } from '@/features/user/actions'
import { User } from '@/features/user/types/User'
import { FriendsListItem } from './FriendsListItem'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { Invitation } from '@prisma/client'
import { PaginationBar, Searchbar } from '@/shared'
import { Search } from 'lucide-react'

interface FriendsListProps {
	currentUserId: string
	requests?: Invitation[]
}

export const FriendsList = ({ currentUserId }: FriendsListProps) => {
	const [friends, setFriends] = useState<User[]>([])
	const [loading, setLoading] = useState(true)

	const [search, setSearch] = useState('')

	const [currentPage, setCurrentPage] = useState(1)

	useEffect(() => {
		const getFriends = async () => {
			setLoading(true)
			const currentUser = await getUserById(currentUserId)
			if (currentUser) {
				const friendsId = currentUser.friends.map(friend => friend.friendId)
				const users = await getUsers()
				const friends = users.filter(user => friendsId.includes(user.id))
				setFriends(friends)
			}
			setLoading(false)
		}
		getFriends().then().catch()
	}, [currentUserId])

	const refreshFriendsHandler = async () => {
		const currentUser = await getUserById(currentUserId)
		if (currentUser) {
			const friendsId = currentUser.friends.map(friend => friend.friendId)
			const users = await getUsers()
			const friends = users.filter(user => friendsId.includes(user.id))
			setFriends(friends)
		}
	}

	const filteredFriends = friends.filter(friend => {
		return friend.name?.toLowerCase().includes(search.toLowerCase())
	})

	const itemsPerPage = 5
	const lastItemIndex = currentPage * itemsPerPage
	const firstItemIndex = lastItemIndex - itemsPerPage

	const currentFriends = filteredFriends.slice(firstItemIndex, lastItemIndex)

	return (
		<>
			{loading && (
				<div className='w-full flex justify-center'>
					<LoadingSpinner />
				</div>
			)}
			{!friends && !loading && <div>No friends found</div>}
			{friends && (
				<div className='space-y-6 py-5'>
					<Searchbar onSetSearch={setSearch} />
					<div className='h-[2px] rounded-sm mb-5 mt-5 opacity-30  bg-violet-500'></div>
					<ul className=' divide-y-2'>
						{currentFriends.map(user => (
							<FriendsListItem
								currentUserId={currentUserId}
								key={user.id}
								user={user}
								variant='friends'
								onRefreshUsers={refreshFriendsHandler}
							/>
						))}
					</ul>
				</div>
			)}
			{filteredFriends.length > itemsPerPage && (
				<PaginationBar
					itemsPerPage={itemsPerPage}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					totalItems={filteredFriends.length}
				/>
			)}
		</>
	)
}

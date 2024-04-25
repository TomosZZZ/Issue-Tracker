'use client'

import React, { useEffect, useState } from 'react'

import { getUserById, getUsers } from '@/features/user/actions'
import { User } from '@/features/user/types/User'
import { FriendsListItem } from './FriendsListItem'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

import { PaginationBar, Searchbar } from '@/shared'
import { useSession } from 'next-auth/react'
import { paginationHandler } from '@/utils'

const ITEMS_PER_PAGE = 5

export const FriendsList = () => {
	const [friends, setFriends] = useState<User[]>([])
	const [loading, setLoading] = useState(true)

	const [search, setSearch] = useState('')

	const [currentPage, setCurrentPage] = useState(1)

	const { data: session } = useSession()
	const currentUserId = session?.user?.id

	useEffect(() => {
		const getFriends = async () => {
			setLoading(true)
			if (!currentUserId) return
			const currentUser = await getUserById(currentUserId)
			if (currentUser) {
				const friendsId = currentUser.friends.map(friend => friend.friendId)
				const users = await getUsers()
				const friends = users.filter(user => friendsId.includes(user.id))
				setFriends(friends)
			}
			setLoading(false)
		}
		getFriends()
			.then()
			.catch(err => {
				return (
					<div>
						<p>{err.message || 'Something went wrong'}</p>
					</div>
				)
			})
	}, [currentUserId])

	const refreshFriendsHandler = async () => {
		if (!currentUserId) return
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

	const currentFriends = paginationHandler<User>({
		currentPage,
		itemsPerPage: ITEMS_PER_PAGE,
		paginatedItems: filteredFriends,
	})

	return (
		<>
			{loading && (
				<div className='w-full flex justify-center'>
					<LoadingSpinner />
				</div>
			)}
			{friends.length == 0 && !loading && (
				<div className='text-center text-lg my-5'>No friends found</div>
			)}
			{friends.length > 0 && currentUserId && (
				<div className='space-y-6 py-5'>
					<Searchbar handleSearchChange={setSearch} />
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
			{filteredFriends.length > ITEMS_PER_PAGE && (
				<PaginationBar
					itemsPerPage={ITEMS_PER_PAGE}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					totalItems={filteredFriends.length}
				/>
			)}
		</>
	)
}

'use client'

import React, { useEffect, useState, useTransition } from 'react'
import { User } from '@/features/user/types/User'

import { RequestListItem } from './RequestListItem'
import { Invitation } from '@/features/user/types/Invitation'
import { getInvitationsById } from '@/features/user/actions'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { PaginationBar, Searchbar } from '@/shared'

interface RequestsListProps {
	currentUser: User
}

export const RequestsList = ({ currentUser }: RequestsListProps) => {
	const [friendRequests, setFriendRequests] = useState<Invitation[]>([])
	const [isPending, startTransition] = useTransition()

	const [search, setSearch] = useState('')
	const [currentPage, setCurrentPage] = useState(1)

	useEffect(() => {
		const getRequests = async () => {
			startTransition(async () => {
				const requests = await getInvitationsById(currentUser.id)
				setFriendRequests(requests)
			})
		}
		getRequests().then().catch()
	}, [currentUser.id])

	const refreshRequestsHandler = async (id: string) => {
		setFriendRequests(friendRequests.filter(request => request.id !== id))
	}

	const itemsPerPage = 5
	const lastItemIndex = currentPage * itemsPerPage
	const firstItemIndex = lastItemIndex - itemsPerPage

	const currentRequests = friendRequests.slice(firstItemIndex, lastItemIndex)

	return (
		<>
			{isPending && (
				<div className='w-full flex justify-center'>
					<LoadingSpinner />
				</div>
			)}
			{!isPending && friendRequests.length === 0 && (
				<div className='text-lg text-center w-full my-5'>No requests found</div>
			)}
			{!isPending && friendRequests.length > 0 && (
				<ul className=' divide-y-2'>
					{currentRequests.map(request => (
						<RequestListItem
							key={request.id}
							request={request}
							currentUser={currentUser}
							onRefreshRequests={refreshRequestsHandler}
						/>
					))}
				</ul>
			)}
			{friendRequests.length > itemsPerPage && (
				<PaginationBar
					itemsPerPage={itemsPerPage}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					totalItems={friendRequests.length}
				/>
			)}
		</>
	)
}

'use client'

import React, { useEffect, useState, useTransition } from 'react'
import { User } from '@/features/user/types/User'

import { RequestListItem } from './RequestListItem'
import { Invitation } from '@/features/user/types/Invitation'
import { getInvitationsById } from '@/features/user/actions'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { PaginationBar } from '@/shared'
import { paginationHandler } from '@/utils'

interface RequestsListProps {
	currentUser: User
}
const ITEMS_PER_PAGE = 5
export const RequestsList = ({ currentUser }: RequestsListProps) => {
	const [friendRequests, setFriendRequests] = useState<Invitation[]>([])
	const [isPending, startTransition] = useTransition()

	const [currentPage, setCurrentPage] = useState(1)

	useEffect(() => {
		const getRequests = async () => {
			startTransition(async () => {
				const requests = await getInvitationsById(currentUser.id)
				setFriendRequests(requests)
			})
		}
		getRequests()
			.then()
			.catch(err => {
				return (
					<div>
						<p>{err.message || 'Something went wrong'}</p>
					</div>
				)
			})
	}, [currentUser.id])

	const refreshRequestsHandler = async (id: string) => {
		setFriendRequests(friendRequests.filter(request => request.id !== id))
	}

	const currentRequests = paginationHandler({
		paginatedItems: friendRequests,
		currentPage,
		itemsPerPage: ITEMS_PER_PAGE,
	})

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
			{friendRequests.length > ITEMS_PER_PAGE && (
				<PaginationBar
					itemsPerPage={ITEMS_PER_PAGE}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					totalItems={friendRequests.length}
				/>
			)}
		</>
	)
}

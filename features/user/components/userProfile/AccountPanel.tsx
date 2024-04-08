'use client'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState, useTransition } from 'react'
import { FaUser } from 'react-icons/fa'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { User } from '../../types'
import { getUserById } from '../../actions'

export const AccountPanel = () => {
	const [user, setUser] = useState<User | null>()

	const [isLoading, setIsLoading] = useState(true)

	const { data: session } = useSession()
	const currentUserId = session?.user?.id

	useEffect(() => {
		const fetchUser = async () => {
			if (!currentUserId) {
				return
			}
			const user = await getUserById(currentUserId)
			setUser(user)
		}
		setIsLoading(true)
		fetchUser().then().catch()
		setIsLoading(false)
	}, [currentUserId])
	return (
		<Card className='shadow-xl shadow-violet-300 flex  align-middle flex-col'>
			<CardHeader>
				<h1 className='text-center w-full py-4 text-2xl font-bold border-b-2 border-violet-600'>
					Account
				</h1>
			</CardHeader>
			{isLoading && (
				<div className='flex justify-center my-5'>
					<LoadingSpinner />
				</div>
			)}
			{!user && !isLoading && (
				<div>
					<p className='my-5'>Something went wrong! No user found</p>
				</div>
			)}

			{user && !isLoading && (
				<CardContent>
					{user && (
						<ul className='text-sm sm:text-lg divide-y divide-slate-300'>
							<li className='flex justify-between py-3 '>
								<p className='font-bold'>Avatar</p>
								<div>
									<Avatar className='w-[30px] h-[30px] sm:w-[40px] sm:h-[40px]'>
										{user.image && user.name && (
											<AvatarImage src={user.image} alt={user.name} />
										)}
										<AvatarFallback>
											<FaUser />
										</AvatarFallback>
									</Avatar>
								</div>
							</li>
							<li className='flex justify-between py-3 '>
								<p className='font-bold'>ID</p>
								<p>{user.id}</p>
							</li>
							<li className='flex justify-between py-3 '>
								<p className='font-bold'>Name</p>
								<p>{user.name}</p>
							</li>
							<li className='flex justify-between py-3 '>
								<p className='font-bold'>Email</p>
								<p>{user.email}</p>
							</li>
						</ul>
					)}
				</CardContent>
			)}
		</Card>
	)
}

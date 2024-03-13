import { Card } from '@/components/ui/card'
import { TabsContent, Tabs, TabsTrigger, TabsList } from '@/components/ui/tabs'

import React from 'react'
import { FriendsList } from './FriendsList'
import { RequestsList } from './RequestsList'
import { AddFriend } from './AddFriend'
import { auth } from '@/features/auth/config/auth'

import { getUserById } from '@/features/user/actions'
import { User } from '@/features/user/types/User'



export const FriendsPanel = async () => {
	const session = await auth()
	if (!session || !session.user) {
		return <div>Something went wrong</div>
	}

	const currentUser = await getUserById(session.user?.id || '')

	if (!currentUser) {
		return <div>Something went wrong</div>
	}

	return (
		<Card className='flex flex-col justify-center items-center '>
			<h1 className='text-center w-full py-4 text-2xl font-bold border-b-2 border-violet-600'>
				Friends
			</h1>
			<Tabs defaultValue='friends' className='w-[90%] my-2'>
				<TabsList className='grid grid-cols-3  '>
					<TabsTrigger value='friends'>Friends</TabsTrigger>
					<TabsTrigger value='requests'>Requests</TabsTrigger>
					<TabsTrigger value='add'>Add</TabsTrigger>
				</TabsList>
				<TabsContent value='friends'>
					<FriendsList currentUserId={(currentUser as User).id} />
				</TabsContent>
				<TabsContent value='requests'>
					<RequestsList currentUser={currentUser} />
				</TabsContent>
				<TabsContent value='add'>
					<AddFriend currentUserId={currentUser.id} />
				</TabsContent>
			</Tabs>
		</Card>
	)
}

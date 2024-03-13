import React from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AccountPanel } from './AccountPanel'
import { FriendsPanel } from './friendsPanel/FriendsPanel'
import { FaUser, FaUsers, FaUserEdit, FaStarOfLife } from 'react-icons/fa'
export const UserProfile = () => {
	return (
		<Tabs defaultValue='account' className='w-1/2'>
			<TabsList className='grid w-full grid-cols-4  bg-gray-800 '>
				<TabsTrigger
					className='data-[state=active]:bg-violet-500 space-x-2 data-[state=active]:text-white text-white '
					value='account'>
					<FaUser size={20} />
					<p>Account</p>
				</TabsTrigger>
				<TabsTrigger
					className='data-[state=active]:bg-violet-500 space-x-2 data-[state=active]:text-white text-white '
					value='friends'>
					<FaUsers size={20} />
					<p>Friends</p>
				</TabsTrigger>
				<TabsTrigger
					className='data-[state=active]:bg-violet-600 space-x-2 data-[state=active]:text-white text-white '
					value='edit'>
					<FaUserEdit size={20} />
					<p>Edit</p>
				</TabsTrigger>
				<TabsTrigger
					className='data-[state=active]:bg-violet-500 space-x-2 data-[state=active]:text-white text-white '
					value='password'>
					<div className='flex '>
						<FaStarOfLife />
						<FaStarOfLife />
						<FaStarOfLife />
					</div>
					<p>Password</p>
				</TabsTrigger>
			</TabsList>
			<TabsContent value='account'>
				<AccountPanel />
			</TabsContent>
			<TabsContent value='friends'>
				<FriendsPanel />
			</TabsContent>
			<TabsContent value='edit'>Edit</TabsContent>
			<TabsContent value='password'>Password</TabsContent>
		</Tabs>
	)
}

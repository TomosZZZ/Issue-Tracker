import React from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AccountTab } from './AccountTab'
import { FriendsTab } from './friendsTab/FriendsTab'
import { FaUser, FaUsers, FaUserEdit, FaStarOfLife } from 'react-icons/fa'
import { EditProfileTab } from './EditProfileTab'
import { ChangePasswordTab } from './ChangePasswordTab'
export const UserProfile = () => {
	return (
		<Tabs defaultValue='account' className='w-[90%] sm:w-3/4 lg:w-3/5 xl:w-1/2'>
			<TabsList className='grid w-full grid-cols-2 grid-rows-2 sm:grid-rows-1 sm:grid-cols-4 h-auto bg-gray-800 '>
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
				<AccountTab />
			</TabsContent>
			<TabsContent value='friends'>
				<FriendsTab />
			</TabsContent>
			<TabsContent value='edit'>
				<EditProfileTab />
			</TabsContent>
			<TabsContent value='password'>
				<ChangePasswordTab />
			</TabsContent>
		</Tabs>
	)
}

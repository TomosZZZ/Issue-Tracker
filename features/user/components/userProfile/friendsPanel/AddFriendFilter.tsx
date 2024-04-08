import {
	Select,
	SelectContent,
	SelectItem,
	SelectValue,
	SelectTrigger,
} from '@/components/ui/select'

import React from 'react'

interface AddFriendFilterProps {
	onGetFriendFilter: (status: string) => void
	className?: string
}

export const AddFriendFilter = (props: AddFriendFilterProps) => {
	const { onGetFriendFilter, className = '' } = props
	return (
		<div className={`${className}`}>
			<Select
				onValueChange={value => {
					onGetFriendFilter(value)
				}}
				defaultValue='all'>
				<SelectTrigger>
					<SelectValue placeholder='Friends' />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='all'>All</SelectItem>
					<SelectItem value='add'>Add</SelectItem>
					<SelectItem value='pending'>Pending</SelectItem>
				</SelectContent>
			</Select>
		</div>
	)
}

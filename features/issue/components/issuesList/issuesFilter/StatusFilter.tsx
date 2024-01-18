import {
	Select,
	SelectContent,
	SelectItem,
	SelectValue,
	SelectTrigger,
} from '@/components/ui/select'

import React from 'react'

interface StatusFilterProps {
	onGetStatusFilter: (status: string) => void
	className?: string
}

export const StatusFilter = (props: StatusFilterProps) => {
	const { onGetStatusFilter, className = '' } = props
	return (
		<div className={`${className}`}>
			<Select
				onValueChange={value => {
					onGetStatusFilter(value)
				}}
				defaultValue='all'>
				<SelectTrigger>
					<SelectValue placeholder='Status' />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='all'>All</SelectItem>
					<SelectItem value='OPEN'>OPEN</SelectItem>
					<SelectItem value='CLOSED'>CLOSED</SelectItem>
					<SelectItem value='IN_PROGRESS'>IN PROGRESS</SelectItem>
				</SelectContent>
			</Select>
		</div>
	)
}

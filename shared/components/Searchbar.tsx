import { Input } from '@/components/ui/input'
import React from 'react'
interface SearchbarProps {
	className?: string
	handleSearchChange: (search: string) => void
}

export const Searchbar = (props: SearchbarProps) => {
	const { handleSearchChange, className } = props
	return (
		<div className={`relative  ${(className && className) || ''}`}>
			<Input
				onChange={e => {
					handleSearchChange(e.target.value)
				}}
				type='text'
				placeholder='Search'
				className='pl-12 pr-4 '
			/>
		</div>
	)
}

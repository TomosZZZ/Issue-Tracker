import { Input } from '@/components/ui/input'
import React from 'react'


interface SearchbarProps {
	className?: string
	onSetSearch: (search: string) => void
}

export const Searchbar = (props: SearchbarProps) => {
	const { onSetSearch, className } = props
	return (
		<div className={`relative  ${className}`}>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				className='absolute top-0 bottom-0 w-6 h-6 my-auto text-violet-600 left-3'
				fill='none'
				viewBox='0 0 24 24'
				stroke='currentColor'>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth={2}
					d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
				/>
			</svg>
			<Input
				onChange={e => {
					onSetSearch(e.target.value)
				}}
				type='text'
				placeholder='Search'
				className='pl-12 pr-4'
			/>
		</div>
	)
}

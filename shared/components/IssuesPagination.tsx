import React from 'react'
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
} from '@/components/ui/pagination'
import { Button } from '@/components/ui/button'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

interface PaginationBar {
	totalItems: number
	itemsPerPage: number
	currentPage: number
	setCurrentPage: (page: number) => void
}

export const PaginationBar = ({
	totalItems,
	itemsPerPage,
	currentPage,
	setCurrentPage,
}: PaginationBar) => {
	const pages = []

	for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
		pages.push(i)
	}

	const handlePrevPage = () => {
		if (currentPage === 1) return
		setCurrentPage(currentPage - 1)
	}
	const handleNextPage = () => {
		if (currentPage === pages.length) return
		setCurrentPage(currentPage + 1)
	}

	return (
		<Pagination>
			<PaginationContent>
				<Button
					className='flex justify-between mx-2 !bg-slate-700  !hover:bg-slate-900'
					onClick={handlePrevPage}
					variant={currentPage === 1 ? 'ghost' : 'default'}
					disabled={currentPage === 1}>
					<FaAngleLeft size={20} />
					<span>Prev</span>
				</Button>
				{pages.map(page => {
					console.log(page, currentPage)
					if (
						page === 1 ||
						page === pages.length ||
						(page >= currentPage - 2 && page <= currentPage + 2)
					) {
						return (
							<PaginationItem
								onClick={() => {
									setCurrentPage(page)
								}}
								className={`${
									page === currentPage && 'bg-violet-500 rounded-md text-white'
								}`}
								key={page}>
								<PaginationLink href={``}>{page}</PaginationLink>
							</PaginationItem>
						)
					}
					return <PaginationEllipsis key={page} />
				})}
				<Button
					className='flex justify-between !bg-slate-700  !hover:bg-slate-900 mx-2   '
					onClick={handleNextPage}
					disabled={currentPage === pages.length}
					variant={currentPage === pages.length ? 'ghost' : 'default'}>
					<span>Next</span>
					<FaAngleRight size={20} />
				</Button>
			</PaginationContent>
		</Pagination>
	)
}

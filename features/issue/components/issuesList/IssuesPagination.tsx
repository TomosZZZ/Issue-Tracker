import React from 'react'
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
} from '@/components/ui/pagination'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

interface IssuesPaginationProps {
	totalItems: number
	itemsPerPage: number
	currentPage: number
	setCurrentPage: (page: number) => void
}

export const IssuesPagination = ({
	totalItems,
	itemsPerPage,
	currentPage,
	setCurrentPage,
}: IssuesPaginationProps) => {
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
					className='flex justify-between mx-2 bg-slate-700  hover:bg-slate-900'
					onClick={handlePrevPage}
					disabled={currentPage === 1}>
					<FaAngleLeft size={20} />
					<span>Prev</span>
				</Button>
				{pages.map(page => {
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
								key={page}
								className={` ${
									currentPage === page && 'bg-neutral-100 rounded-md'
								}`}>
								<PaginationLink href={``}>{page}</PaginationLink>
							</PaginationItem>
						)
					}
					return <PaginationEllipsis key={page} />
				})}
				<Button
					className='flex justify-between bg-slate-700  hover:bg-slate-900 mx-2   '
					onClick={handleNextPage}
					disabled={currentPage === pages.length}>
					<span>Next</span>
					<FaAngleRight size={20} />
				</Button>
			</PaginationContent>
		</Pagination>
	)
}

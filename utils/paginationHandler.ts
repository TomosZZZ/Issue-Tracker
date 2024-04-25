type PaginationHandlerData<T> = {
	currentPage: number
	itemsPerPage: number
	paginatedItems: T[]
}

export const paginationHandler = <T>({
	currentPage,
	itemsPerPage,
	paginatedItems,
}: PaginationHandlerData<T>) => {
	const indexOfLastItem = currentPage * itemsPerPage
	const indexOfFirstItem = indexOfLastItem - itemsPerPage
	const currentItems = paginatedItems.slice(indexOfFirstItem, indexOfLastItem)

	return currentItems
}

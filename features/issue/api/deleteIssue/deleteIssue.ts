

export const deleteIssue = async (id: number) => {
	const response = await fetch(`/api/issues`, {
		method: 'DELETE',
		headers: {
			'Content-Type': `/api/issues`,
		},
		body: JSON.stringify({ id }),
	})
	const issue = await response.json()
	return issue
}

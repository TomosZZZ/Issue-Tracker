export type IssueModel = {
	id: number
	title: string
	description: string
	status: Status
	createdAt: Date
	updatedAt: Date
}

enum Status {
	OPEN,
	IN_PROGRESS,
	CLOSED,
}

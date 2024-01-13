export type IssueModel = {
	[x: string]: any
	id: number
	title: string
	description: string
	status: Status
	createdAt: Date
	updatedAt: Date
}

enum Status {
	OPEN = 'OPEN',
	IN_PROGRESS = 'IN_PROGRESS',
	CLOSED = 'CLOSED',
}

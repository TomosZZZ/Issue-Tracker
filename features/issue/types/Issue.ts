export type Issue = {
	id: number
	title: string
	description: string
	status: Status
	createdAt: Date
	updatedAt: Date
}

export enum Status {
	OPEN = 'OPEN',
	IN_PROGRESS = 'IN_PROGRESS',
	CLOSED = 'CLOSED',
}

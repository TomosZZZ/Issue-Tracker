import { UserIssues } from '@/shared/types/UserIssues'

export type Issue = {
	id: number
	title: string
	description: string
	status: Status
	createdAt: Date
	updatedAt: Date
	users: UserIssues[]
	creatorId: string
}
export type NewIssueFormData = {
	title: string
	description: string
	status: Status
	users: { userId: string }[]
	creatorId: string
}
export type EditIssueFormData = {
	title: string
	description: string
	status: Status
	users: { userId: string }[]
}
export enum Status {
	OPEN = 'OPEN',
	IN_PROGRESS = 'IN_PROGRESS',
	CLOSED = 'CLOSED',
}

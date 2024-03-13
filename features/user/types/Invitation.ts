import { InvitationStatus } from '@prisma/client'
export type Invitation = {
	id: string
	senderId: string
	recieverId: string
	status: InvitationStatus
	createdAt: Date
}

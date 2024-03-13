import db from '@/prisma/db'

export class InvitationRepository {
	async getInvitations() {
		return await db.invitation.findMany()
	}

	async createInvitation(senderId: string, recieverId: string) {
		const response = await db.invitation.create({
			data: {
				senderId,
				recieverId,
			},
		})
		if (!response) return { error: 'Invitation not sent. Something went wrong' }
		return { success: 'Invitation sent' }
	}
	async getInvitationsByUserId(userId: string) {
		return await db.invitation.findMany({
			where: {
				recieverId: userId,
			},
		})
	}
	async deleteInvitation(id: string) {
		const response = await db.invitation.delete({
			where: {
				id,
			},
		})
		if (!response) {
			return { error: 'Invitation not deleted. Something went wrong' }
		}

		return { success: 'Invitation deleted' }
	}
}

export const invitationRepository = new InvitationRepository()

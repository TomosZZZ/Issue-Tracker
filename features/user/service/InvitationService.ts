import { invitationRepository } from '../repository/InvitationRepository'

export class InvitationService {
	async getInvitations() {
		return await invitationRepository.getInvitations()
	}
	async createInvitation(senderId: string, recieverId: string) {
		return await invitationRepository.createInvitation(senderId, recieverId)
	}
	async getInvitationsByUserId(userId: string) {
		return await invitationRepository.getInvitationsByUserId(userId)
	}
	async deleteInvitation(id: string) {
		return await invitationRepository.deleteInvitation(id)
	}
}

export const invitationService = new InvitationService()

'use server'
import { invitationService } from '../../service'

export const getInvitationsById = async (userId: string) => {
	return await invitationService.getInvitationsByUserId(userId)
}

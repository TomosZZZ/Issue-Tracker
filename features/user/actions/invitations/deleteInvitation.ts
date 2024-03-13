'use server'

import { invitationService } from '../../service'

export const deleteInvitation = async (id: string) => {
	const response = await invitationService.deleteInvitation(id)
	if (response.error) {
		throw new Error(response.error)
	}
	return response
}

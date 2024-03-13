'use server'

import { invitationService } from '../../service'

export const createInvitation = async ({
	senderId,
	recieverId,
}: {
	senderId: string
	recieverId: string
}) => {
	const response = await invitationService.createInvitation(
		senderId,
		recieverId
	)
	if (response.error) throw new Error(response.error)
	return response
}

'use server'

import { invitationService } from "../../service"

export const getInvitations = async () => {
    return await invitationService.getInvitations()
}
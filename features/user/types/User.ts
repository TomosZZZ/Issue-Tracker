import { Invitation } from './Invitation'

export type User = {
	id: string
	name: string | null
	image: string | null
	email: string | null
	password: string | null
	emailVerified: Date | null
	friends: UserFriends[]
	friendOf: UserFriends[]
	sentInvitations: Invitation[]
	recievedInvitations: Invitation[]
}

export type UserFriends = {
	userId: string
	friendId: string
}

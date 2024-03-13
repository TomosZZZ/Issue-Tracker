import db from '@/prisma/db'
import bcrypt from 'bcryptjs'
export class UserRepository {
	async getUserByEmail(email: string) {
		return db.user.findUnique({
			where: {
				email,
			},
			include: {
				friends: true,
				friendOf: true,
				sentInvitations: true,
				recievedInvitations: true,
			},
		})
	}
	async getUserById(id: string) {
		return db.user.findUnique({
			where: {
				id,
			},
			include: {
				friends: true,
				friendOf: true,
				sentInvitations: true,
				recievedInvitations: true,
			},
		})
	}
	async createUser(email: string, password: string, name: string) {
		const hashedPassword = await bcrypt.hash(password, 10)
		await db.user.create({
			data: {
				email,
				password: hashedPassword,
				name,
			},
		})
	}

	async addFriend(userId: string, friendId: string) {
		const response = await db.userFriends.create({
			data: {
				userId,
				friendId,
			},
		})
		const res = await db.userFriends.create({
			data: {
				userId: friendId,
				friendId: userId,
			},
		})

		if (!response || !res) {
			return { error: 'Friend not added. Something went wrong' }
		}
		return { success: 'Friend added' }
	}

	async getUsers() {
		const users = await db.user.findMany({
			include: {
				friends: true,
				friendOf: true,
				sentInvitations: true,
				recievedInvitations: true,
			},
		})

		return users
	}
	async deleteFriend(userId: string, friendId: string) {
		const res1 = await db.userFriends.delete({
			where: {
				userId_friendId: {
					userId,
					friendId,
				},
			},
		})
		const response2 = await db.userFriends.delete({
			where: {
				userId_friendId: {
					userId: friendId,
					friendId: userId,
				},
			},
		})

		if (!res1 || !response2) {
			return { error: 'Friend not deleted. Something went wrong' }
		}
		return { success: 'Friend deleted' }
	}
}

export const userRepository = new UserRepository()

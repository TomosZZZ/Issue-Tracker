import db from '@/prisma/db'
import bcrypt from 'bcryptjs'
import { EditPasswordSchema } from '../schemas'
import { z } from 'zod'
import { ChangePasswordDto, EditUserDto } from '../dto'
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
	async editUser(data: EditUserDto, id: string) {
		const response = await db.user.update({
			data: {
				image: data.image,
				name: data.name,
			},
			where: {
				id,
			},
		})
		if (!response) {
			return { error: 'Something went wrong. Could not update profile' }
		}
		return { success: 'Profile updated successfuly!' }
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
	async changePassword({
		password,
		newPassword,
		passwordConfirmation,
		id,
	}: ChangePasswordDto) {
		const user = await this.getUserById(id)
		if (!user) {
			return { error: 'User not found' }
		}
		if (!user.password) {
			return { error: 'Password is required' }
		}
		const passwordIsValid = await bcrypt.compare(password, user.password)
		if (!passwordIsValid) {
			return { error: 'Password is invalid' }
		}
		if (newPassword !== passwordConfirmation) {
			return { error: 'New passwords are not the same' }
		}
		const hashedPassword = await bcrypt.hash(newPassword, 10)
		const response = await db.user.update({
			data: {
				password: hashedPassword,
			},
			where: {
				id,
			},
		})
		if (!response) {
			return { error: 'Something went wrong. Could not update password' }
		}
		return { success: 'Password updated successfuly!' }
	}
}

export const userRepository = new UserRepository()

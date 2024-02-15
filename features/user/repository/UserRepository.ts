import db from '@/prisma/db'
import bcrypt from 'bcryptjs'
export class UserRepository {
	async findUserByEmail(email: string) {
		return db.user.findUnique({
			where: {
				email,
			},
		})
	}
	async findUserById(id: string) {
		return db.user.findUnique({
			where: {
				id,
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
}

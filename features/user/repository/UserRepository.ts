import db from '@/prisma/db'

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
}

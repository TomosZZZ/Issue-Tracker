import db from '@/prisma/db'
import { EditIssueFormData, NewIssueFormData } from '@/features/issue/types'

export class IssueRepository {
	async getIssues() {
		return await db.issue.findMany({ include: { users: true } })
	}
	async getIssueById(id: number) {
		return await db.issue.findUnique({
			where: {
				id,
			},
			include: {
				users: true,
			},
		})
	}

	async createIssue({
		title,
		description,
		status,
		users,
		creatorId,
	}: NewIssueFormData) {
		return await db.issue.create({
			data: {
				title,
				description,
				status,
				users: {
					createMany: {
						data: users ?? [],
					},
				},
				creatorId,
			},
		})
	}

	async deleteIssue(id: number) {
		return await db.issue.delete({
			where: {
				id,
			},
		})
	}
	async updateIssue({
		id,
		formData: { title, description, status, users },
	}: {
		id: number
		formData: EditIssueFormData
	}) {
		const issue = await db.issue.findUnique({
			where: { id },
			include: { users: true },
		})
		if (!issue) return null
		const usersToDeleteFromRelation = issue.users.filter(
			issueUser => !users.map(user => user.userId).includes(issueUser.userId)
		)

		return await db.issue.update({
			where: {
				id: id,
			},
			data: {
				title,
				description,
				status,
				users: {
					deleteMany: usersToDeleteFromRelation.map(user => ({
						userId: user.userId,
						issueId: id,
					})),
					connectOrCreate: users.map(user => {
						return {
							where: { userId_issueId: { userId: user.userId, issueId: id } },
							create: { userId: user.userId },
						}
					}),
				},
			},
		})
	}
}

export const issueRepository = new IssueRepository()

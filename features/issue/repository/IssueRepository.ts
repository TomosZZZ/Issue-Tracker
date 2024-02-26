import db from '@/prisma/db'
import { IssueFormData } from '@/features/issue/types'

export class IssueRepository {
	async getIssues() {
		return await db.issue.findMany()
	}
	async getIssueById(id: number) {
		return await db.issue.findUnique({
			where: {
				id,
			},
		})
	}

	async createIssue({ title, description, status }: IssueFormData) {
		return await db.issue.create({
			data: {
				title,
				description,
				status,
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
		formData: { title, description, status },
	}: {
		id: number
		formData: IssueFormData
	}) {
		return await db.issue.update({
			where: {
				id: id,
			},
			data: {
				title,
				description,
				status,
			},
		})
	}
}

export const issueRepository = new IssueRepository()

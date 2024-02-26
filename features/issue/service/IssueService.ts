import { IssueFormData } from '@/features/issue/types'
import { IssueRepository } from '../repository/IssueRepository'
import { CreateIssueSchema } from '../schemas'

const { createIssue, getIssues, getIssueById, deleteIssue, updateIssue } =
	new IssueRepository()
export class IssueService {
	async createIssue(issue: IssueFormData) {
		const validation = CreateIssueSchema.safeParse(issue)
		if (!validation.success) {
			const errorMsgs = validation.error.issues.map(issue => issue.message)
			return { error: errorMsgs.join(', ') }
		}
		createIssue(issue).then(() => {})
		return { success: 'Issue created' }
	}

	async getIssues() {
		return await getIssues()
	}
	async getIssue(issueId: number) {
		return await getIssueById(issueId)
	}
	async deleteIssue(issueId: number) {
		return await deleteIssue(issueId)
	}
	async editIssue(issueId: number, issue: IssueFormData) {
		return await updateIssue({ id: issueId, formData: issue })
	}
}
export const issueService = new IssueService()

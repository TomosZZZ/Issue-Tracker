import { EditIssueFormData, NewIssueFormData } from '@/features/issue/types'
import { IssueRepository } from '../repository/IssueRepository'

const { createIssue, getIssues, getIssueById, deleteIssue, updateIssue } =
	new IssueRepository()
export class IssueService {
	async createIssue(issue: NewIssueFormData) {
		const response = await createIssue(issue)
		if (!response) {
			return { error: 'Issue not created.Something went wrong' }
		}
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
	async editIssue(issueId: number, issue: EditIssueFormData) {
		return await updateIssue({ id: issueId, formData: issue })
	}
}
export const issueService = new IssueService()

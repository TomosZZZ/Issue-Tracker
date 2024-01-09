import { IssueModel } from '@/types/IssueModel'
import { createIssueSchema } from '@/features/issue'
import { z } from 'zod'

type IssueFormSchema = z.infer<typeof createIssueSchema>

const API_PATH = process.env.NEXT_PUBLIC_API_PATH

export const getIssues = async () => {
	const response = await fetch(`${API_PATH}/api/issues`)
	if (!response.ok) {
		return { message: 'Something went wrong', statuse: response.status }
	}
	const issues = (await response.json()) as IssueModel[]
	return issues
}

export const createIssue = async (data: IssueFormSchema) => {
	const response = await fetch(`${API_PATH}/api/issues`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
	const issue = await response.json()
	return issue
}

export const deleteIssue = async (id: number) => {
	const response = await fetch(`/api/issues`, {
		method: 'DELETE',
		headers: {
			'Content-Type': `${API_PATH}/api/issues`,
		},
		body: JSON.stringify({ id }),
	})
	const issue = await response.json()
	return issue
}

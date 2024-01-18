import { EditIssueSchema } from '@/features/issue'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/db'
import { Status } from '@/features/issue/types/Issue'
import { ZodError } from 'zod'

export const PATCH = async (
	request: NextRequest,
	{ params }: { params: { id: string } }
) => {
	const id = parseInt(params.id)
	try {
		const body = await request.json()
		const issue = EditIssueSchema.parse(body.issue)

		if (isNaN(id)) {
			return NextResponse.json(
				{},
				{ status: 400, statusText: `Id: '${id}' is not a number` }
			)
		}
		const editedIssue = await prisma.issue.update({
			where: { id },
			data: { ...issue, status: issue.status as Status },
		})
		return NextResponse.json({ editedIssue }, { status: 200 })
	} catch (e) {
		const { issues } = e as ZodError

		const errorMsgs = issues.map(issue => issue.message)
		return NextResponse.json(
			{},
			{ status: 400, statusText: errorMsgs.join(', ') }
		)
	}
}

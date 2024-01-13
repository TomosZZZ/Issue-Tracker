import { editIssueSchema } from '@/features/issue/schemas'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/db'
import { z } from 'zod'
import { Status } from '@prisma/client'

export const PATCH = async (request: NextRequest) => {
	const id = parseInt(request.url.split('/').slice(-1)[0])
	const body = (await request.json()) as {
		issue: z.infer<typeof editIssueSchema>
	}
	const editedIssue = body.issue

	if (isNaN(id)) {
		return NextResponse.json(
			{},
			{ status: 400, statusText: `Id: '${id}' is not a number` }
		)
	}
	const issue = await prisma.issue.update({
		where: { id },
		data: { ...editedIssue, status: Status[editedIssue.status] },
	})
	return NextResponse.json({ issue }, { status: 200 })
}

import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/db'
import { CreateIssueSchema } from '@/features/issue'

export const POST = async (request: NextRequest) => {
	const body = await request.json()
	const validation = CreateIssueSchema.safeParse(body)

	if (!validation.success) {
		const errorMsgs = validation.error.issues.map(issue => issue.message)
		return NextResponse.json(
			{},
			{ status: 400, statusText: errorMsgs.join(', ') }
		)
	}

	const newIssue = await prisma.issue.create({
		data: { title: body.title, description: body.description },
	})

	return NextResponse.json(newIssue, { status: 201 })
}

export const GET = async () => {
	const issues = await prisma.issue.findMany()
	return NextResponse.json(issues, { status: 201 })
}

export const DELETE = async (request: NextRequest) => {
	const body = (await request.json()) as { id: number }
	const { id } = body
	if (!id) {
		return NextResponse.json({}, { status: 400, statusText: 'Id is required' })
	}
	const issue = await prisma.issue.delete({ where: { id: Number(id) } })
	return NextResponse.json(issue, { status: 201 })
}

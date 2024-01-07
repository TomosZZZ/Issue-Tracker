import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/db'
import { createIssueSchema } from '../../../features/issue/types/validationSchemas'

export const POST = async (request: NextRequest) => {
	const body = await request.json()
	const validation = createIssueSchema.safeParse(body)

	if (!validation.success) {
		return NextResponse.json(validation.error.format(), { status: 400 })
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
		return NextResponse.json({ message: 'Id is required' }, { status: 400 })
	}
	const issue = await prisma.issue.delete({ where: { id: Number(id) } })
	return NextResponse.json(issue, { status: 201 })
}

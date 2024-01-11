import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/db'

export const GET = async (request: NextRequest) => {
	const id = parseInt(request.url.split('/').slice(-1)[0])

	if (isNaN(id)) {
		return NextResponse.json(
			{},
			{ status: 400, statusText: `Id: '${id}' is not a number` }
		)
	}

	const issue = await prisma.issue.findUnique({ where: { id } })
	if (issue === null) {
		return NextResponse.json(
			{},
			{ status: 404, statusText: `Issue with id: '${id}' not found` }
		)
	}
	return NextResponse.json({ issue }, { status: 200 })
}

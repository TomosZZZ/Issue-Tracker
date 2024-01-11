import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/db'

export const GET = async (request: NextRequest) => {
	const id = parseInt(request.url.split('/').slice(-1)[0])

	if (isNaN(id)) {
		return NextResponse.next()
	}

	const issue = await prisma.issue.findUnique({ where: { id } })

	return NextResponse.json({ issue }, { status: 200 })
}

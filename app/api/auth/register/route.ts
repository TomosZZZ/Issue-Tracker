import { RegisterSchema } from '@/features/auth/schemas/RegisterSchema'
import { RegisterFormData } from '@/features/auth/types'
import db from '@/prisma/db'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
export const POST = async (request: NextRequest) => {
	const data = await request.json()
	const { email, password, name } = data as RegisterFormData
	const validation = RegisterSchema.safeParse(data)

	if (!validation.success) {
		const errorMsgs = validation.error.issues.map(issue => issue.message)
		return NextResponse.json({ error: errorMsgs.join(', ') }, { status: 400 })
	}

	const existingUser = await db.user.findFirst({
		where: {
			email,
		},
	})

	if (existingUser) {
		return NextResponse.json({ error: 'User already exists' }, { status: 400 })
	}
	const hashedPassword = await bcrypt.hash(password, 10)
	await db.user.create({
		data: {
			email,
			password: hashedPassword,
			name,
		},
	})

	return NextResponse.json({ success: 'User created' }, { status: 201 })
}

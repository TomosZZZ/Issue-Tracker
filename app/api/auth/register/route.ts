import { RegisterFormData } from '@/features/auth/types'
import { NextRequest, NextResponse } from 'next/server'
import { UserService } from '@/features/user/service/UserService'
export const POST = async (request: NextRequest) => {
	const credentials = (await request.json()) as RegisterFormData

	const { createUser } = new UserService()

	const { response, status } = await createUser(credentials)

	return NextResponse.json(response, { status })
}

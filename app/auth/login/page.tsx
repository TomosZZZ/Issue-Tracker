import { LoginForm } from '@/features/auth'
import React, { Suspense } from 'react'

const LoginPage = () => {
	return (
		<div className=' flex align-center justify-center'>
			<Suspense>
				<LoginForm />
			</Suspense>
		</div>
	)
}

export default LoginPage

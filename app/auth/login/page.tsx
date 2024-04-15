import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { LoginForm } from '@/features/auth'
import React, { Suspense } from 'react'

const LoginPage = () => {
	return (
		<div className=' flex align-center justify-center'>
			<Suspense
				fallback={
					<div className='flex items-center justify-center'>
						<LoadingSpinner />
					</div>
				}>
				<LoginForm />
			</Suspense>
		</div>
	)
}

export default LoginPage

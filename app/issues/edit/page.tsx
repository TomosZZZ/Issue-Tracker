import React, { Suspense } from 'react'
import { EditIssueForm } from '@/features/issue/components'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
const EditIssuePage = () => {
	return (
		<div className='flex items-center justify-center'>
			<Suspense fallback={<LoadingSpinner />}>
				<EditIssueForm />
			</Suspense>
		</div>
	)
}

export default EditIssuePage

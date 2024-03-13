import React, { Suspense } from 'react'
import { EditIssueForm } from '@/features/issue/components'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
const EditIssuePage = () => {
	return (
		<Suspense fallback={<LoadingSpinner />}>
			<EditIssueForm />
		</Suspense>
	)
}

export default EditIssuePage

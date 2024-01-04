import { Button } from '@/components/ui/button'
import { NewIssueForm } from '@/features/issue/components/NewIssueForm'
import Link from 'next/link'
import React from 'react'

const IssuesPage = () => {
	return (
		<div>
			<Button>
				<Link href={'/issues/new'}>New Issue</Link>
			</Button>
		</div>
	)
}

export default IssuesPage

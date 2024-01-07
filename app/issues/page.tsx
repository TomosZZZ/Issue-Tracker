import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { IssuesList } from '@/features/issue/components/IssuesList'
import Link from 'next/link'
import React from 'react'

const IssuesPage = () => {
	return (
		<div className='flex items-center justify-center w-full'>
			<Card className='w-[60%] p-6 shadow-xl shadow-violet-200'>
				<Button className='bg-violet-600 p-0 hover:bg-violet-800'>
					<Link className='px-3 py-1' href={'/issues/new'}>
						New Issue
					</Link>
				</Button>
				<IssuesList />
			</Card>
		</div>
	)
}

export default IssuesPage

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { IssuesList } from '@/features/issue/components/issuesList'
import Link from 'next/link'
import React from 'react'

const MyIssuesPage = () => {
	return (
		<div className='flex items-center justify-center w-full py-10'>
			<Card className='w-[90%] lg:w-[60%] p-6 shadow-xl shadow-violet-200'>
				<Button className='bg-violet-600 p-0 hover:bg-violet-800'>
					<Link className='px-3 py-1' href={'/issues/new'}>
						New Issue
					</Link>
				</Button>
				<IssuesList variant='myIssues' />
			</Card>
		</div>
	)
}

export default MyIssuesPage

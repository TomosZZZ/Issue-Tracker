import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React from 'react'

export const AccountPanel = () => {
	const accData = [
		{ username: 'Nazwa' },
		{ email: 'email' },
		{ password: '1234asd123' },
	]

	return (
		<Card className='shadow-xl shadow-violet-300 flex  align-middle flex-col'>
			<CardHeader>
				<h1 className='text-center w-full py-4 text-2xl font-bold border-b-2 border-violet-600'>
					Account
				</h1>
			</CardHeader>
			<CardContent>
				<ul className=' divide-y divide-slate-300'>
					{accData.map((data, index) => (
						<li className='flex justify-between py-3 ' key={index}>
							<p className=' capitalize'> {Object.keys(data)}</p>
							<p>{Object.values(data)}</p>
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	)
}

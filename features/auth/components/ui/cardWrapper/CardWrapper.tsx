'use client'

import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card'
import { BottomButton } from './BottomButton'
import { Header } from './Header'
import { Social } from './SocialMediaButtons'

interface CardWrapperProps {
	children: React.ReactNode
	headerLabel: string
	bottomButtonLabel: string
	bottomButtonHref: string
	showSocial?: boolean
}

export const CardWrapper = ({
	children,
	headerLabel,
	bottomButtonHref,
	bottomButtonLabel,
	showSocial,
}: CardWrapperProps) => {
	return (
		<Card className='w-[400px] lg:w-[600px] shadow-xl shadow-violet-200 '>
			<CardHeader>
				<Header label={headerLabel} />
			</CardHeader>
			<CardContent>{children}</CardContent>
			{showSocial && (
				<CardFooter>
					<Social />
				</CardFooter>
			)}
			<CardFooter>
				<BottomButton href={bottomButtonHref} label={bottomButtonLabel} />
			</CardFooter>
		</Card>
	)
}

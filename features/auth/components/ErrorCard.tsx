import { FaExclamationTriangle } from 'react-icons/fa'
import { CardWrapper } from './ui'

export const ErrorCard = () => {
	return (
		<CardWrapper
			headerLabel='Ooops! Something went wrong!'
			bottomButtonHref='/auth/login'
			bottomButtonLabel='Back to login'>
			<div className='w-full flex justify-center items-center'>
				<FaExclamationTriangle className='text-destructive' />
			</div>
		</CardWrapper>
	)
}

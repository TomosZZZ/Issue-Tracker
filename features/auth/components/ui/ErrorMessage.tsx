import { FaExclamationTriangle } from 'react-icons/fa'

interface ErrorMessage {
	message: string
}

export const ErrorMessage = ({ message }: ErrorMessage) => {
	if (!message) return null
	return (
		<div className='flex bg-destructive/15 p-3 rounded-md items-center gap-x-2 text-sm text-destructive'>
			<FaExclamationTriangle className='h-5 w-5' />
			<p>{message}</p>
		</div>
	)
}

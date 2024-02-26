import { FaCheckCircle } from 'react-icons/fa'

interface SuccessMessage {
	message: string
}

export const SuccessMessage = ({ message }: SuccessMessage) => {
	if (!message) return null
	return (
		<div className='flex bg-emerald-500/15 p-3 rounded-md items-center gap-x-2 text-sm text-emerald-500'>
			<FaCheckCircle className='h-4 w-4' />
			<p>{message}</p>
		</div>
	)
}

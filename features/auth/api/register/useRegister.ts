'use client'

import { useMutation } from '@tanstack/react-query'
import { register } from './register'

export const useRegister = () => {
	const registerMutation = useMutation({
		mutationFn: register,
	})

	return registerMutation
}

import { RegisterFormData } from '../../types'

export const register = async (values: RegisterFormData) => {
	const response = await fetch('/api/auth/register', {
		method: 'POST',
		body: JSON.stringify(values),
	})
	const data = await response.json()
	return data
}

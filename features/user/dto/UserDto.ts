import { z } from 'zod'
import { EditPasswordSchema, EditProfileSchema } from '../schemas'

export type ChangePasswordDto = z.infer<typeof EditPasswordSchema> & {
	id: string
}

export type EditUserDto = z.infer<typeof EditProfileSchema>

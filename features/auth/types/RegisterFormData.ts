import { z } from 'zod'
import { RegisterSchema } from '../schemas/RegisterSchema'

export type RegisterFormData = z.infer<typeof RegisterSchema>

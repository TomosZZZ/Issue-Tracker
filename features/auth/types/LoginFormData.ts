import { z } from 'zod'
import { LoginSchema } from '../schemas'

export type LoginFormData = z.infer<typeof LoginSchema>

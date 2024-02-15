import { z } from 'zod'

const MIN_NAME_LENGTH = 3

const emailSchema = z.object({
  name: z.string().min(MIN_NAME_LENGTH),
  email: z.string().email(),
})

export { emailSchema }

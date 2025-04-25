import { z } from 'zod'

export const setupProfileValidator = z.object({
  gender: z.enum(['male', 'female']),
  height: z
    .number()
    .min(50, { message: 'Height must be at least 50 cm.' })
    .max(240, { message: 'Height must not exceed 240 cm.' }),
  weight: z
    .number()
    .min(30, { message: 'Weight must be at least 30 kg.' })
    .max(500, { message: 'Weight must not exceed 500 kg.' }),
  age: z
    .number()
    .min(18, { message: 'Age must be at least 18 years.' })
    .max(100, { message: 'Age must not exceed 100 years.' }),
  activity_level: z.number()
})

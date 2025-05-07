import { z } from 'zod'

const blogListSchema = z.object({
  header: z.string().min(1, { message: 'Header is required' }),
  text: z.string().min(1, { message: 'Text content is required' }),
  id: z.coerce
    .number()
    .positive({ message: 'Recipe ID must be a positive number' })
    .refine(val => !isNaN(val), {
      message: 'Recipe ID must be a valid number'
    })
})

export const blogValidator = z.object({
  name: z.string().min(1, { message: 'Blog name is required' }),
  description: z.string().nullable(),
  list: z.array(blogListSchema).optional()
})

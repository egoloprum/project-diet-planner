import { z } from 'zod'

export const ProfileValidator = z.object({
  email: z.string().email('Invalid email format').nonempty('Email is required'),

  username: z
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .max(20, 'Username must be at most 20 characters long')
    .nonempty('Username is required'),

  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .nonempty('Password is required')
})

import { z } from 'zod'

export const CollectionValidator = z.object({
  name: z
    .string()
    .nonempty('Collection name is required.')
    .max(100, 'Collection name must not exceed 100 characters.'),
  description: z.string().nullable()
})

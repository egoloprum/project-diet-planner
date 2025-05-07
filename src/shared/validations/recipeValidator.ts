import { z } from 'zod'

export const RecipeValidator = z.object({
  foodName: z
    .string()
    .nonempty('Food name is required.')
    .max(100, 'Food name must not exceed 100 characters.'),

  prepTime: z
    .string()
    .transform(val => {
      const num = Number(val)
      return isNaN(num) ? 0 : num
    })
    .refine(
      val => val >= 0 && val <= 1440,
      'Preparation time must be between 0 and 1440.'
    ),

  cookTime: z
    .string()
    .transform(val => {
      const num = Number(val)
      return isNaN(num) ? 0 : num
    })
    .refine(
      val => val >= 0 && val <= 1440,
      'Cook time must be between 0 and 1440.'
    ),

  tagCloud: z.array(z.string()).optional().default([]),

  fats: z
    .string()
    .transform(val => {
      const num = Number(val)
      return isNaN(num) ? 0 : num
    })
    .refine(val => val >= 0 && val <= 100, 'Fats must be between 0 and 100.'),

  carbs: z
    .string()
    .transform(val => {
      const num = Number(val)
      return isNaN(num) ? 0 : num
    })
    .refine(val => val >= 0 && val <= 200, 'Carbs must be between 0 and 200.'),

  protein: z
    .string()
    .transform(val => {
      const num = Number(val)
      return isNaN(num) ? 0 : num
    })
    .refine(
      val => val >= 0 && val <= 100,
      'Protein must be between 0 and 100.'
    ),

  calories: z
    .string()
    .transform(val => {
      const num = Number(val)
      return isNaN(num) ? 0 : num
    })
    .refine(
      val => val >= 0 && val <= 1000,
      'Calories must be between 0 and 1000.'
    ),

  direction: z.string().default('')
})

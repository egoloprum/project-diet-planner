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

  isMainDish: z.boolean().optional().default(false),
  isBreakfast: z.boolean().optional().default(false),
  isLunch: z.boolean().optional().default(false),
  isDinner: z.boolean().optional().default(false),
  isDessert: z.boolean().optional().default(false),
  isSnack: z.boolean().optional().default(false),

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

  fiber: z
    .string()
    .transform(val => {
      const num = Number(val)
      return isNaN(num) ? 0 : num
    })
    .refine(val => val >= 0 && val <= 100, 'Fiber must be between 0 and 100.'),

  sugar: z
    .string()
    .transform(val => {
      const num = Number(val)
      return isNaN(num) ? 0 : num
    })
    .refine(val => val >= 0 && val <= 100, 'Sugar must be between 0 and 100.'),

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

  cholesterol: z
    .string()
    .transform(val => {
      const num = Number(val)
      return isNaN(num) ? 0 : num
    })
    .refine(
      val => val >= 0 && val <= 300,
      'Cholesterol must be between 0 and 300.'
    ),

  direction: z.string().default('')
})

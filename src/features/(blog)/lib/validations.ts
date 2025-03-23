import { z } from "zod";

export const CustomRecipeValidator = z.object({
  foodName: z.string().nonempty("Required").max(100),
  prepTime: z.number().default(0),
  cookTime: z.number().default(0),

  isMainDish: z.boolean().default(false),
  isBreakfast: z.boolean().default(false),
  isLunch: z.boolean().default(false),
  isDinner: z.boolean().default(false),
  isDessert: z.boolean().default(false),
  isSnack: z.boolean().default(false),
  tagCloud: z.string(),

  fats: z.number().min(0).max(100).default(0),
  carbs: z.number().min(0).max(200).default(0),
  fiber: z.number().min(0).max(100).default(0),
  sugar: z.number().min(0).max(100).default(0),
  protein: z.number().min(0).max(100).default(0),
  calories: z.number().min(0).max(1000).default(0),
  cholesterol: z.number().min(0).max(300).default(0),

  direction: z.string().default(""),
});

import { Recipe } from './recipe.type'

export interface Planner {
  breakfast: Recipe | null
  lunch: Recipe | null
  dinner: Recipe | null
  snack: Recipe | null
  dessert: Recipe | null

  id: number
  user_id: string
  date: string

  calories: number
  carbs: number
  fats: number
  protein: number
}

import { Recipe } from './recipe.type'

export interface Planner {
  breakfast: Recipe[]
  lunch: Recipe[]
  dinner: Recipe[]
  snack: Recipe[]
  dessert: Recipe[]

  id: number
  user_id: string
  date: string

  calories: number
  carbs: number
  fats: number
  protein: number
}

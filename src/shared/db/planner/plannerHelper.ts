import { Planner, Recipe } from '../../model'
import { createClient } from '../supabase'

export const getRecipesForPlanner = async (
  keyword: string,
  minCalories: number,
  maxCalories: number
  // minCarbs: number,
  // maxCarbs: number,
  // minFats: number,
  // maxFats: number,
  // minProtein: number,
  // maxProtein: number
): Promise<Recipe | null> => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('recipe')
    .select('*')
    .ilike('tag_cloud', `%${keyword}%`)
    .gt('calories', minCalories)
    .lt('calories', maxCalories)
  // .gt('carbs', minCarbs)
  // .lt('carbs', maxCarbs)
  // .gt('fats', minFats)
  // .lt('fats', maxFats)
  // .gt('protein', minProtein)
  // .lt('protein', maxProtein)

  if (error) {
    throw new Error(`Failed to fetch recipes: ${error.message}`)
  }

  if (data.length === 0) {
    throw new Error(`Failed to find correct recipes!`)
  }

  if (data) {
    const randomIndex = Math.floor(Math.random() * data.length)
    return data[randomIndex]
  }

  return null
}

export const getPlannerByDate = async (
  userId: string,
  date: string
): Promise<Planner | null> => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('planner')
    .select('*')
    .eq('user_id', userId)
    .eq('date', date)
    .single()

  if (error) {
    return null
  }

  return data
}

export const createPlanner = async (
  userId: string,
  date: string,
  breakfast: Recipe | null,
  lunch: Recipe | null,
  dinner: Recipe | null,
  snack: Recipe | null,
  dessert: Recipe | null,
  calories: number,
  carbs: number,
  fats: number,
  protein: number
): Promise<Planner | null> => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('planner')
    .insert({
      user_id: userId,
      date: date,
      breakfast: breakfast,
      lunch: lunch,
      dinner: dinner,
      snack: snack,
      dessert: dessert,
      calories: calories,
      carbs: carbs,
      fats: fats,
      protein: protein
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create planner: ${error.message}`)
  }

  return data
}

export const deletePlannerByDate = async (
  userId: string,
  date: string
): Promise<Planner | null> => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('planner')
    .delete()
    .eq('user_id', userId)
    .eq('date', date)
    .select('*')
    .single()

  if (error) {
    throw new Error(`Failed to delete planner: ${error.message}`)
  }

  return data
}

export const setPlannerByDate = async (
  userId: string,
  date: string,
  breakfast: number[],
  lunch: number[],
  dinner: number[],
  snack: number[],
  dessert: number[]
): Promise<Planner | null> => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('planner')
    .update({
      breakfast: breakfast,
      lunch: lunch,
      dinner: dinner,
      snack: snack,
      dessert: dessert
    })
    .eq('user_id', userId)
    .eq('date', date)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update planner: ${error.message}`)
  }

  return data
}

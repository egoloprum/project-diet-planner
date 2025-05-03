import { Planner, Recipe } from '../../model'
import { createClient } from '../supabase'

// must edit recipe type, as nutritions json continues to fail
export const getRecipesForPlanner = async (
  keyword: string,
  minCalories: number,
  maxCalories: number,
  minCarbs: number,
  maxCarbs: number,
  minFats: number,
  maxFats: number,
  minProtein: number,
  maxProtein: number
): Promise<Recipe | null> => {
  const supabase = await createClient()

  const { data, error } = await supabase.rpc('get_recipes', {
    keyword: keyword,
    min_calories: minCalories,
    max_calories: maxCalories,
    min_carbs: minCarbs,
    max_carbs: maxCarbs,
    min_fats: minFats,
    max_fats: maxFats,
    min_protein: minProtein,
    max_protein: maxProtein
  })

  if (error) {
    console.log('error', error)
    return null
  }

  if (data && data.length > 0) {
    const randomIndex = Math.floor(Math.random() * data.length)

    console.log({
      calories: data[randomIndex].nutritions.calories,
      carbs: data[randomIndex].nutritions.carbs,
      fats: data[randomIndex].nutritions.fats,
      protein: data[randomIndex].nutritions.protein
    })

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

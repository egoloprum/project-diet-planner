import { Planner } from '../../model'
import { createClient } from '../supabase'

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
  breakfast: number[],
  lunch: number[],
  dinner: number[],
  snack: number[],
  dessert: number[]
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
      dessert: dessert
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

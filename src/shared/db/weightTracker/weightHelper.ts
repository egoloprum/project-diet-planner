import { WeightTracker } from '../../model'
import { createClient } from '../supabase'

export const createWeightTracker = async (
  userId: string,
  date: string
): Promise<WeightTracker | null> => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('weightTracker')
    .insert({ user_id: userId, date: date })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to add weight: ${error.message}`)
  }

  return data
}

export const getWeightByDate = async (
  userId: string,
  date: string
): Promise<WeightTracker | null> => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('weightTracker')
    .select('*')
    .eq('user_id', userId)
    .eq('date', date)
    .single()

  if (error) {
    return null
  }

  return data
}

export const getWeightByUser = async (
  userId: string
): Promise<WeightTracker[] | null> => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('weightTracker')
    .select('*')
    .eq('user_id', userId)

  if (error) {
    throw new Error(`Failed to fetch weight: ${error.message}`)
  }

  return data
}

export const setWeightByDate = async (
  userId: string,
  date: string,
  weight: number
): Promise<WeightTracker | null> => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('weightTracker')
    .update({ weight: weight })
    .eq('user_id', userId)
    .eq('date', date)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update weight: ${error.message}`)
  }

  return data
}

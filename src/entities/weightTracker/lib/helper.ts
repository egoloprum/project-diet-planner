import { createClient } from '@/src/shared/db/supabase'

import { WeightTracker } from '../model/types'

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
    .order('date', { ascending: false })
    .limit(7)

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

  const { data: existingData, error: lookupError } = await supabase
    .from('weightTracker')
    .select()
    .eq('user_id', userId)
    .eq('date', date)
    .single()

  if (lookupError) {
    throw new Error(`Failed to check existing weight: ${lookupError.message}`)
  }

  if (existingData) {
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
  } else {
    const { data, error } = await supabase
      .from('weightTracker')
      .insert([{ user_id: userId, date: date, weight: weight }])
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to create weight entry: ${error.message}`)
    }
    return data
  }
}

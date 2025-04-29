import { Profile } from '@/src/shared/model'

import { createClient } from '../supabase'

export const finishSetup = async (userId: string) => {
  if (!userId) {
    return null
  }

  const supabase = await createClient()
  const { data: profileData, error } = await supabase
    .from('profile')
    .update({ is_setup: true })
    .eq('user_id', userId)
    .select()
    .single()

  if (error) {
    return null
  }

  return profileData
}

export const getProfile = async (userId: string): Promise<Profile | null> => {
  if (!userId) {
    return null
  }

  const supabase = await createClient()
  const { data: profileData, error } = await supabase
    .from('profile')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error) {
    return null
  }

  return profileData
}

export const createProfile = async (userId: string) => {
  if (!userId) {
    return null
  }

  const supabase = await createClient()
  const { data: profileData, error } = await supabase
    .from('profile')
    .insert({
      user_id: userId,
      avatar_url: `/pics/${Math.floor(Math.random() * (24 - 1 + 1)) + 1}.png`
    })
    .select()
    .single()

  if (error) {
    return null
  }

  return profileData
}

export const updateProfile = async (
  userId: string,
  profile: Omit<
    Profile,
    | 'avatar_url'
    | 'id'
    | 'user_id'
    | 'is_setup'
    | 'gender'
    | 'age'
    | 'height'
    | 'activity_level'
    | 'goal'
    | 'calories'
    | 'fats'
    | 'carbs'
    | 'protein'
  >
): Promise<Profile | null> => {
  if (!userId) {
    return null
  }

  const supabase = await createClient()
  const { data: profileData, error } = await supabase
    .from('profile')
    .update(profile)
    .eq('user_id', userId)
    .select()
    .single()

  if (error) {
    return null
  }

  return profileData
}

export const setGender = async (
  userId: string,
  gender: string
): Promise<Profile | null> => {
  if (!userId) {
    return null
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('profile')
    .update({ gender: gender })
    .eq('user_id', userId)
    .select()
    .single()

  if (error) {
    return null
  }

  return data
}

export const setAge = async (
  userId: string,
  age: number
): Promise<Profile | null> => {
  if (!userId) {
    return null
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('profile')
    .update({ age: age })
    .eq('user_id', userId)
    .select()
    .single()

  if (error) {
    return null
  }

  return data
}

export const setHeight = async (
  userId: string,
  height: number
): Promise<Profile | null> => {
  if (!userId) {
    return null
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('profile')
    .update({ height: height })
    .eq('user_id', userId)
    .select()
    .single()

  if (error) {
    return null
  }

  return data
}

export const setActivityLevel = async (
  userId: string,
  activityLevel: number
): Promise<Profile | null> => {
  if (!userId) {
    return null
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('profile')
    .update({ activity_level: activityLevel })
    .eq('user_id', userId)
    .select()
    .single()

  if (error) {
    return null
  }

  return data
}

export const setGoal = async (
  userId: string,
  goal: string
): Promise<Profile | null> => {
  if (!userId) {
    return null
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('profile')
    .update({ goal: goal })
    .eq('user_id', userId)
    .select()
    .single()

  if (error) {
    return null
  }

  return data
}

export const setNutritions = async (
  calories: number,
  nutritions: {
    carbs: number
    fats: number
    protein: number
  },
  userId: string
): Promise<Profile | null> => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('profile')
    .update({
      calories: calories,
      carbs: nutritions.carbs,
      fats: nutritions.fats,
      protein: nutritions.protein
    })
    .eq('user_id', userId)
    .select()
    .single()

  if (error) {
    return null
  }

  return data
}

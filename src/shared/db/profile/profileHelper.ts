import { Profile } from '@/src/shared/model'

import { createClient } from '../supabase'

export const getProfile = async (user_id: string): Promise<Profile | null> => {
  const supabase = await createClient()

  const { data: profileData, error } = await supabase
    .from('profile')
    .select('*')
    .eq('user_id', user_id)
    .single()

  if (error) {
    throw new Error(`Failed to fetch profile: ${error.message}`)
  }

  return profileData
}

export const updateProfile = async (
  user_id: string,
  profile: Omit<Profile, 'avatar_url' | 'id' | 'user_id'>
): Promise<Profile | null> => {
  const supabase = await createClient()

  const { data: profileData, error } = await supabase
    .from('profile')
    .update(profile)
    .eq('user_id', user_id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update profile: ${error.message}`)
  }

  return profileData
}

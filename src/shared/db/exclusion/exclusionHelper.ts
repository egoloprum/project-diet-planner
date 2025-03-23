import { QueryData } from '@supabase/supabase-js'

import { createClient } from '../supabase'

export const createExclusion = async (user_id: string) => {
  const supabase = await createClient()
  const { error } = await supabase
    .from('exclusions')
    .insert({ user_id: user_id })

  if (error) {
    return new Response('Invalid request', { status: 400 })
  }
  return new Response('OK', { status: 200 })
}

export const getExclusion = async (user_id: string) => {
  const supabase = await createClient()
  const { data, error } = (await supabase
    .from('exclusions')
    .select('user_id, list')
    .eq('user_id', user_id)
    .single()) as QueryData<{ data: Exclusion }>

  if (error) {
    return null
  }
  return data as Exclusion
}

export const updateExclusion = async (
  user_id: string,
  selectedItems: string[]
) => {
  const excluseExists = await getExclusion(user_id)

  if (!excluseExists) {
    await createExclusion(user_id)
  }

  const supabase = await createClient()
  const { error } = await supabase
    .from('exclusions')
    .update({ list: selectedItems })
    .eq('user_id', user_id)

  if (error) {
    console.log('exclusion update failed')
    return new Response('Invalid request', { status: 400 })
  }

  console.log('exclusion update success')
  return new Response('OK', { status: 200 })
}

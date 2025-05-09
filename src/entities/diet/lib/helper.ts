import { QueryData } from '@supabase/supabase-js'

import { createClient } from '@/src/shared/db/supabase'

import { Diet } from '../model/types'

export const getDiet = async (user_id: string): Promise<Diet> => {
  const supabase = await createClient()

  const { data: Diet, error: getError } = (await supabase
    .from('diet')
    .select('user_id, diet_type')
    .eq('user_id', user_id)
    .single()) as QueryData<{ data: Diet }>

  if (getError) {
    const { error: createError } = await supabase
      .from('diet')
      .insert({ user_id: user_id, diet_type: 'Anything' })

    if (createError) {
      throw new Error('Invalid request')
    }

    return { user_id, diet_type: 'Anything' } as Diet
  }

  return Diet as Diet
}

export const updateDiet = async (user_id: string, diet_type: string) => {
  const supabase = await createClient()
  const { error } = await supabase
    .from('diet')
    .update({ diet_type: diet_type })
    .eq('user_id', user_id)

  if (error) {
    return new Response('Invalid request', { status: 400 })
  }

  return new Response('OK', { status: 200 })
}

import { QueryData } from "@supabase/supabase-js"
import { createClient } from "../supabase"

export const getPrimaryDiet = async (user_id: string): Promise<PrimaryDiet> => {
  const supabase = await createClient()

  const { data: primaryDiet, error: getError } = await supabase
    .from('primaryDiet')
    .select('user_id, diet_type')
    .eq('user_id', user_id)
    .single() as QueryData<{ data: PrimaryDiet }>

  if (getError) {
    const { error: createError } = await supabase
      .from('primaryDiet')
      .insert({ user_id: user_id, diet_type: 'Anything' })

    if (createError) {
      throw new Error('Invalid request')
    }

    return { user_id, diet_type: 'Anything' } as PrimaryDiet
  }

  return primaryDiet as PrimaryDiet
}

export const updatePrimaryDiet = async (user_id: string, diet_type: string) => {
  const supabase = await createClient()
  const { error } = await supabase
    .from('primaryDiet')
    .update({ diet_type: diet_type })
    .eq('user_id', user_id)

  if (error) { console.log('primary diet update failed')
    return new Response('Invalid request', { status: 400 }) 
  }

  console.log('primary diet update success')
  return new Response('OK', { status: 200 })
}

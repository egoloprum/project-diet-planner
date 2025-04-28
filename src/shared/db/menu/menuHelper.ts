import { Menu } from '../../model'
import { createClient } from '../supabase'

export const createMenu = async (userId: string): Promise<Menu | null> => {
  if (!userId) {
    return null
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('menu')
    .insert({
      user_id: userId
    })
    .select()
    .single()

  if (error) {
    return null
  }

  return data
}

export const getMenu = async (userId: string): Promise<Menu | null> => {
  if (!userId) {
    return null
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('menu')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error) {
    return null
  }

  return data
}

export const updateMenu = async (
  userId: string,
  menu: Menu
): Promise<Menu | null> => {
  if (!userId) {
    return null
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('menu')
    .update(menu)
    .eq('user_id', userId)
    .select()
    .single()

  if (error) {
    return null
  }

  return data
}

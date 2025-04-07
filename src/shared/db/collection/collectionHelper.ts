import { QueryData } from '@supabase/supabase-js'

import { Collection } from '../../model'
import { createClient } from '../supabase'

export const collectionCreate = async (collection: Omit<Collection, 'id'>) => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('collection')
    .insert(collection)
    .select()

  if (error) {
    throw new Error(`Failed to create collection: ${error.message}`)
  }

  return data
}

export const collectionGetByUser = async (user_id: string) => {
  const supabase = await createClient()
  const { data, error } = (await supabase
    .from('collection')
    .select('*')
    .eq('user_id', user_id)) as QueryData<{ data: Collection[] }>

  if (error) {
    return null
  }
  return data as Collection[]
}

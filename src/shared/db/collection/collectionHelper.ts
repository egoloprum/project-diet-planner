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

export const collectionGetById = async (id: number) => {
  const supabase = await createClient()
  const { data, error } = (await supabase
    .from('collection')
    .select('*')
    .eq('id', id)
    .single()) as QueryData<{ data: Collection }>

  if (error) {
    return null
  }
  return data as Collection
}

export const collectionAddRecipe = async (
  collection_id: number,
  recipes: number[]
) => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('collection')
    .update({ recipes: recipes })
    .eq('id', collection_id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update collection: ${error.message}`)
  }

  return data
}

import { QueryData } from '@supabase/supabase-js'

import { createClient } from '@/src/shared/db/supabase'

import { Collection } from '../model/types'

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

export const collectionUpdate = async (collection: Collection) => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('collection')
    .update(collection)
    .eq('id', collection.id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update collection: ${error.message}`)
  }

  return data
}

export const collectionDelete = async (collection_id: number) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('collection')
    .delete()
    .eq('id', collection_id)
    .select('id')
    .single()

  if (error) {
    throw new Error(`Failed to delete collection: ${error.message}`)
  }

  return data
}

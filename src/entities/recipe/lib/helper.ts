import { QueryData } from '@supabase/supabase-js'

import { createClient } from '@/src/shared/db/supabase'

import { Recipe } from '../model/types'

export const recipeSearch = async (
  query: string,
  filter: string,
  sorting: string,
  page: number,
  pageSize: number
) => {
  try {
    const supabase = await createClient()
    const start = (page - 1) * pageSize
    const end = start + pageSize - 1

    const { data, error, count } = await supabase
      .from('recipe')
      .select('*', { count: 'exact' })
      .or(`food_name.ilike.%${query}%,tag_cloud.ilike.%${query}%`)
      .or(`food_name.ilike.%${filter}%,tag_cloud.ilike.%${filter}%`)
      .order(`${sorting.length ? sorting : 'calories'}`, {
        ascending: sorting.length ? false : true
      })
      .range(start, end)

    if (error) throw error

    return {
      recipes: data as Recipe[],
      total: count || 0,
      page,
      pageSize,
      lastPage: Math.ceil((count || 0) / pageSize)
    }
  } catch {
    return {
      recipes: [],
      total: 0,
      page: 1,
      pageSize,
      lastPage: 1
    }
  }
}

export const recipeGetById = async (id: string) => {
  const supabase = await createClient()
  const { data, error } = (await supabase
    .from('recipe')
    .select('*')
    .eq('id', id)
    .single()) as QueryData<{ data: Recipe }>

  if (error) {
    return null
  }
  return data as Recipe
}

export const recipeGetByUser = async (user_id: string) => {
  const supabase = await createClient()
  const { data, error } = (await supabase
    .from('recipe')
    .select('*')
    .eq('user_id', user_id)) as QueryData<{ data: Recipe[] }>

  if (error) {
    return null
  }
  return data as Recipe[]
}

export const recipeGetByCollection = async (collection_id: number) => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('recipe')
    .select('*')
    .contains('collections', [collection_id])

  if (error) {
    return null
  }
  return data as Recipe[]
}

export const recipeAddToCollection = async (
  id: string,
  collections: number[]
) => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('recipe')
    .update({ collections: collections })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update recipe: ${error.message}`)
  }

  return data
}

export const recipeCreate = async (recipe: Omit<Recipe, 'id'>) => {
  const supabase = await createClient()
  const { data, error } = await supabase.from('recipe').insert(recipe).select()

  if (error) {
    throw new Error(`Failed to create recipe: ${error.message}`)
  }

  return data
}

export const recipeUpdate = async (recipe: Recipe) => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('recipe')
    .update(recipe)
    .eq('id', recipe.id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update recipe: ${error.message}`)
  }

  return data
}

export const recipeDelete = async (id: number) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('recipe')
    .delete()
    .eq('id', id)
    .select('id')
    .single()

  if (error) {
    throw new Error(`Failed to delete recipe: ${error.message}`)
  }

  return data
}

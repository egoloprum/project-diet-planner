import { QueryData } from '@supabase/supabase-js'

import { Recipe } from '../../model'
import { createClient } from '../supabase'

export const recipeSearch = async (
  keyword: string,
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
      .or(`food_name.ilike.%${keyword}%,tag_cloud.ilike.%${keyword}%`)
      .order('created_at', { ascending: false })
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

export const recipeGetById = async (recipe_id: string) => {
  const supabase = await createClient()
  const { data, error } = (await supabase
    .from('recipe')
    .select('*')
    .eq('recipe_id', recipe_id)
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
  recipe_id: string,
  collections: number[]
) => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('recipe')
    .update({ collections: collections })
    .eq('recipe_id', recipe_id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update recipe: ${error.message}`)
  }

  return data
}

export const recipeCreate = async (recipe: Omit<Recipe, 'recipe_id'>) => {
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
    .eq('recipe_id', recipe.recipe_id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update recipe: ${error.message}`)
  }

  return data
}

export const recipeDelete = async (recipe_id: number) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('recipe')
    .delete()
    .eq('recipe_id', recipe_id)
    .select('recipe_id')
    .single()

  if (error) {
    throw new Error(`Failed to delete recipe: ${error.message}`)
  }

  return data
}

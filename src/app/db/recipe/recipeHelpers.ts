import { QueryData } from "@supabase/supabase-js"
import { createClient } from "../supabase"

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
  } catch (error) {
    console.error('Search error:', error)
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
  const { data, error } = await supabase
    .from('recipe')
    .select('*')
    .eq('recipe_id', recipe_id)
    .single() as QueryData<{ data: Recipe }>

  if (error) {return null}  
  return data as Recipe
}

import { QueryData } from "@supabase/supabase-js"
import { createClient } from "../supabase"


export const recipeSearch = async (keyword: string) => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('recipe')
    .select('*')
    .or(`food_name.ilike.%${keyword}%,tag_cloud.ilike.%${keyword}%`) as QueryData<{ data: Recipe[] }>

  if (error) { return null }
  return data as Recipe[]
}

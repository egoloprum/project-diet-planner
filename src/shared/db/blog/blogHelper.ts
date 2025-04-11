import { QueryData } from '@supabase/supabase-js'

import { Blog } from '../../model'
import { createClient } from '../supabase'

export const blogCreate = async (blog: Omit<Blog, 'id' | 'created_at'>) => {
  const supabase = await createClient()
  const { data, error } = await supabase.from('blog').insert(blog).select()

  if (error) {
    throw new Error(`Failed to create blog: ${error.message}`)
  }

  return data
}

export const blogGetByUser = async (user_id: string) => {
  const supabase = await createClient()
  const { data, error } = (await supabase
    .from('blog')
    .select('*')
    .eq('user_id', user_id)) as QueryData<{ data: Blog[] }>

  if (error) {
    return null
  }
  return data as Blog[]
}

export const blogGetById = async (id: number) => {
  const supabase = await createClient()
  const { data, error } = (await supabase
    .from('blog')
    .select('*')
    .eq('id', id)
    .single()) as QueryData<{ data: Blog }>

  if (error) {
    return null
  }
  return data as Blog
}

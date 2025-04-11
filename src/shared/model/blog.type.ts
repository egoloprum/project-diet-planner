interface BlogList {
  header: string
  text: string
  recipe_id: number
}

export interface Blog {
  id: number
  created_at: string
  name: string
  description: string | null
  list: BlogList[] | null
  user_id: string
}

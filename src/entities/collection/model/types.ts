export interface Collection {
  id: number
  name: string
  description: string | null
  user_id: string
  recipes: number[]
}

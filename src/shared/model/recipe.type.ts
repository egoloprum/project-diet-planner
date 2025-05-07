export interface Recipe {
  id: number
  food_name: string
  prep_time: number
  cook_time: number
  images: {
    image: string
    thumbnail: string
  }

  tag_cloud: string

  calories: number
  carbs: number
  fats: number
  protein: number

  directions: string[]

  ingredients: string[]

  collections: number[]
  user_id: string | null
}

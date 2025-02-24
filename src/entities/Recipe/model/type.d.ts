interface Exclusion {
  user_id: string 
  list: string[]
}

interface PrimaryDiet {
  user_id: string 
  diet_type: string
}

interface NutritionTarget {
  user_id: string 
  id: string
  title: string
  calories: number 
  carbs: number 
  fats: number 
  protein: number 
  fiber: number 
}

interface NutritionRecipe {
  calories:       number
  carbs:          number 
  fat:            number
  fiber:          number
  protein:        number
  sugar:          number
  cholesterol:    number
}

interface Recipe {
  recipe_id: number
  food_name: string
  prep_time: number
  cook_time: number 
  images: {
    image: string
    thumbnail: string
  }
  
  is_main_dish: boolean
  is_breakfast: boolean
  is_lunch: boolean
  is_dinner: boolean
  is_dessert: boolean
  is_snack: boolean
  tag_cloud: string

  nutritions: NutritionRecipe
  directions: string[]
  
  ingredients: {
    name: string
    description: string
  }[]

  is_custom: boolean
}

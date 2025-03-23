import { createClient } from '@/src/shared/db/supabase'

export const createCustomRecipe = async (user_id: string) => {
  const supabase = await createClient()
  const { error: customRecipeError } = await supabase.from('recipe').insert({
    food_name: foodName,
    prep_time: prepTime,
    cook_time: cookTime,
    images: {
      image: '',
      thumbnail: ''
    },
    is_main_dish: isMainDish,
    is_breakfast: isBreakfast,
    is_lunch: isLunch,
    is_dinner: isDinner,
    is_dessert: isDessert,
    is_snack: isSnack,
    tag_cloud: tagCloud,
    nutritions: {},
    direction: [],
    ingredients: [],
    is_custom: true,
    user_id: user_id
  })
}

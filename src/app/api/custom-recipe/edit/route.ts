import { NextResponse } from 'next/server'

import { recipeEdit } from '@/src/shared/db/recipe/recipeHelpers'
import { Recipe } from '@/src/shared/model'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { error: 'Missing recipe data' },
        { status: 400 }
      )
    }

    const editRecipe: Recipe = {
      recipe_id: body.recipe_id,
      food_name: body.foodName,
      prep_time: body.prepTime,
      cook_time: body.cookTime,
      images: {
        image: '',
        thumbnail: ''
      },

      is_main_dish: body.isMainDish,
      is_breakfast: body.isBreakfast,
      is_lunch: body.isLunch,
      is_dinner: body.isDinner,
      is_dessert: body.isDessert,
      is_snack: body.isSnack,

      tag_cloud: body.tagCloud.join(' '),

      nutritions: {
        fat: body.fats,
        carbs: body.carbs,
        fiber: body.fiber,
        sugar: body.sugar,
        protein: body.protein,
        calories: body.calories,
        cholesterol: body.cholesterol
      },

      directions: [body.direction],
      ingredients: [],

      is_custom: true,
      user_id: body.userId
    }
    const result = await recipeEdit(editRecipe)

    if (!result) {
      return NextResponse.json(
        { error: 'Failed to edit recipe' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Recipe edit successfully', data: result },
      { status: 201 }
    )
  } catch {
    return NextResponse.json(
      { error: 'Internal server error - please try again later' },
      { status: 500 }
    )
  }
}

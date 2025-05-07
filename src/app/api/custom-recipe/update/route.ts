import { NextResponse } from 'next/server'

import { recipeUpdate } from '@/src/shared/db'
import { Recipe } from '@/src/shared/model'

export async function PATCH(req: Request) {
  try {
    const body = await req.json()

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { error: 'Missing recipe data' },
        { status: 400 }
      )
    }

    const editRecipe: Recipe = {
      id: body.id,
      food_name: body.foodName,
      prep_time: body.prepTime,
      cook_time: body.cookTime,
      images: {
        image: '',
        thumbnail: ''
      },

      tag_cloud: body.tagCloud.join(' '),

      calories: body.calories,
      carbs: body.carbs,
      fats: body.fats,
      protein: body.protein,

      directions: [body.direction],
      ingredients: [],

      user_id: body.userId,
      collections: body.collections
    }
    const result = await recipeUpdate(editRecipe)

    if (!result) {
      return NextResponse.json(
        { error: 'Failed to update recipe' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Recipe updated successfully', data: result },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { error: 'Internal server error - please try again later' },
      { status: 500 }
    )
  }
}

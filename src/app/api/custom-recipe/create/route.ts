import { NextResponse } from 'next/server'

import { Recipe, recipeCreate } from '@/src/entities/recipe'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { error: 'Missing recipe data' },
        { status: 400 }
      )
    }

    const newRecipe: Omit<Recipe, 'id'> = {
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

      directions: body.direction.length ? [body.direction] : [],
      ingredients: [],

      user_id: body.userId,
      collections: []
    }

    const result = await recipeCreate(newRecipe)

    if (!result) {
      return NextResponse.json(
        { error: 'Failed to create recipe!' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Recipe created successfully!', data: result },
      { status: 201 }
    )
  } catch {
    return NextResponse.json(
      { error: 'Internal server error - please try again later!' },
      { status: 500 }
    )
  }
}

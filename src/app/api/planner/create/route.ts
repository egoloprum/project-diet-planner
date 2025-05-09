import { NextResponse } from 'next/server'

import { createPlanner, getRecipesForPlanner } from '@/src/shared/db'
import { Recipe } from '@/src/shared/model'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ error: 'Missing data!' }, { status: 400 })
    }

    const { caloriesPercentages } = body
    const { profileCalories } = body
    // const { profileCarbs } = body
    // const { profileFats } = body
    // const { profileProtein } = body

    let breakfastStore: Recipe | null = null
    let lunchStore: Recipe | null = null
    let dinnerStore: Recipe | null = null
    let snackStore: Recipe | null = null
    let dessertStore: Recipe | null = null

    let calories = 0
    let carbs = 0
    let fats = 0
    let protein = 0

    for (const element of caloriesPercentages) {
      const { name, percentage } = element
      const defaultCalories = (profileCalories / 100) * percentage
      const minCalories = Math.floor(defaultCalories * 0.95)
      const maxCalories = Math.floor(defaultCalories * 1.05)

      // const minCarbs = Math.floor(profileCarbs * 0.95)
      // const maxCarbs = Math.floor(profileCarbs * 1.05)

      // const minFats = Math.floor(profileFats * 0.95)
      // const maxFats = Math.floor(profileFats * 1.05)

      // const minProtein = Math.floor(profileProtein * 0.95)
      // const maxProtein = Math.floor(profileProtein * 1.05)

      const recipe = await getRecipesForPlanner(
        name,
        minCalories,
        maxCalories
        // minCarbs,
        // maxCarbs,
        // minFats,
        // maxFats,
        // minProtein,
        // maxProtein
      )

      if (recipe) {
        calories += recipe.calories
        carbs += recipe.carbs
        fats += recipe.fats
        protein += recipe.protein
      }

      switch (name) {
        case 'breakfast':
          breakfastStore = recipe
          break
        case 'lunch':
          lunchStore = recipe
          break
        case 'dinner':
          dinnerStore = recipe
          break
        case 'snack':
          snackStore = recipe
          break
        case 'dessert':
          dessertStore = recipe
          break
      }
    }

    const result = await createPlanner(
      body.userId,
      body.date,
      breakfastStore,
      lunchStore,
      dinnerStore,
      snackStore,
      dessertStore,
      calories,
      carbs,
      fats,
      protein
    )

    if (!result) {
      return NextResponse.json(
        { error: 'Failed to create planner!' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Planner created successfully!', data: result },
      { status: 201 }
    )
  } catch {
    return NextResponse.json(
      { error: 'Internal server error - please try again later!' },
      { status: 500 }
    )
  }
}

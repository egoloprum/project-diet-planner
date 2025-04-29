import { NextResponse } from 'next/server'

import { setNutritions } from '@/src/shared/db'
import { calculator } from '@/src/shared/lib'

export async function PATCH(req: Request) {
  try {
    const body = await req.json()

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 })
    }

    const { calories, nutritions } = calculator(
      body.gender,
      body.weight,
      body.height,
      body.age,
      body.activityLevel,
      body.goal
    )

    const result = await setNutritions(calories, nutritions, body.userId)

    if (!result) {
      return NextResponse.json(
        { error: 'Failed to change nutrition!' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Nutrition changed successfully!', data: result },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { error: 'Internal server error - please try again later!' },
      { status: 500 }
    )
  }
}

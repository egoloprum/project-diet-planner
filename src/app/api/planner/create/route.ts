import { NextResponse } from 'next/server'

import { createPlanner } from '@/src/shared/db'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ error: 'Missing data!' }, { status: 400 })
    }

    const result = await createPlanner(
      body.userId,
      body.date,
      body.breakfast || [],
      body.lunch || [],
      body.dinner || [],
      body.snack || [],
      body.dessert || []
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

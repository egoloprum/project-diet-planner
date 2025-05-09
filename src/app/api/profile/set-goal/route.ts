import { NextResponse } from 'next/server'

import { setGoal } from '@/src/shared/db'

export async function PATCH(req: Request) {
  try {
    const body = await req.json()

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ error: 'Missing data!' }, { status: 400 })
    }

    const result = await setGoal(body.userId, body.goal)

    if (!result) {
      return NextResponse.json(
        { error: 'Failed to change goal!' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Goal changed successfully!', data: result },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { error: 'Internal server error - please try again later!' },
      { status: 500 }
    )
  }
}

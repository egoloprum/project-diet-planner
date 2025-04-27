import { NextResponse } from 'next/server'

import { setWeightByDate } from '@/src/shared/db'

export async function PATCH(req: Request) {
  try {
    const body = await req.json()

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 })
    }

    const result = await setWeightByDate(body.userId, body.date, body.weight)

    if (!result) {
      return NextResponse.json(
        { error: 'Failed to change weight' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Weight changed successfully', data: result },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { error: 'Internal server error - please try again later' },
      { status: 500 }
    )
  }
}

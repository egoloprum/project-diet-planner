import { NextResponse } from 'next/server'

import { setAge } from '@/src/shared/db'

export async function PATCH(req: Request) {
  try {
    const body = await req.json()

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ error: 'Missing data!' }, { status: 400 })
    }

    const result = await setAge(body.userId, body.age)

    if (!result) {
      return NextResponse.json(
        { error: 'Failed to change age!' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Age changed successfully!', data: result },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { error: 'Internal server error - please try again later!' },
      { status: 500 }
    )
  }
}

import { NextResponse } from 'next/server'

import { setEmail } from '@/src/entities/profile'

export async function PATCH(req: Request) {
  try {
    const body = await req.json()

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ error: 'Missing data!' }, { status: 400 })
    }

    const result = await setEmail(body.email)

    if (!result) {
      return NextResponse.json(
        { error: 'Failed to change email!' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Email changed successfully!', data: result },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { error: 'Internal server error - please try again later!' },
      { status: 500 }
    )
  }
}

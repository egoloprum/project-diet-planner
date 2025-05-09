import { NextResponse } from 'next/server'

import { updateDiet } from '@/src/entities/diet'
import { updateExclusion } from '@/src/entities/exclusion'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { user_id, name, list } = body

    if (!user_id || !name || !list) {
      return NextResponse.json(
        { error: 'Missing required fields!' },
        { status: 400 }
      )
    }

    await Promise.all([
      updateDiet(user_id, name),
      updateExclusion(user_id, list)
    ])

    return NextResponse.json(
      { message: 'Primary diet updated!' },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { error: 'Internal server error!' },
      { status: 500 }
    )
  }
}

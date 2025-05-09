import { NextResponse } from 'next/server'

import { getExclusion } from '@/src/entities/exclusion'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const user_id = searchParams.get('user_id')

    if (!user_id) {
      return NextResponse.json(
        { error: 'Missing user_id parameter!' },
        { status: 400 }
      )
    }

    const selectedExclusions = await getExclusion(user_id)
    return NextResponse.json(
      { exclusions: selectedExclusions?.list || [] },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { error: 'Internal server error!' },
      { status: 500 }
    )
  }
}

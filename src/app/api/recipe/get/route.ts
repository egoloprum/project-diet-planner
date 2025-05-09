import { NextResponse } from 'next/server'

import { recipeGetById } from '@/src/entities/recipe'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const idParam = searchParams.get('id')

    if (!idParam) {
      return NextResponse.json({ error: 'Missing recipe id!' }, { status: 400 })
    }

    const id = parseInt(idParam, 10)
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid recipe id!' }, { status: 400 })
    }

    const result = await recipeGetById(`${id}`)

    if (!result) {
      return NextResponse.json(
        { error: 'Failed to fetch recipe!' },
        { status: 500 }
      )
    }

    return NextResponse.json(result, { status: 200 })
  } catch {
    return NextResponse.json(
      { error: 'Internal server error - please try again later!' },
      { status: 500 }
    )
  }
}

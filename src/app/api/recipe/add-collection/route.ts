import { NextResponse } from 'next/server'

import { recipeAddToCollection } from '@/src/shared/db'

export async function PATCH(req: Request) {
  try {
    const body = await req.json()

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 })
    }

    const { recipe_id, collections } = body

    await recipeAddToCollection(
      recipe_id as string,
      (collections as number[]) || []
    )

    return NextResponse.json(
      { message: 'Collection is added to recipe!' },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { error: 'Internal server error - please try again later' },
      { status: 500 }
    )
  }
}

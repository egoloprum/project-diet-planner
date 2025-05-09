import { NextResponse } from 'next/server'

import { collectionAddRecipe } from '@/src/entities/collection'

export async function PATCH(req: Request) {
  try {
    const body = await req.json()

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 })
    }

    const { collection_id, recipes } = body

    await collectionAddRecipe(collection_id, (recipes as number[]) || [])

    return NextResponse.json(
      { message: 'Recipe is added to collection!' },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { error: 'Internal server error - please try again later!' },
      { status: 500 }
    )
  }
}

import { NextResponse } from 'next/server'

import { recipeDelete } from '@/src/entities/recipe'

export async function DELETE(req: Request) {
  try {
    const body = await req.json()

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 })
    }

    const { recipeId } = body

    const result = await recipeDelete(recipeId)
    if (!result) {
      return NextResponse.json(
        { error: 'Failed to delete recipe!' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Recipe deleted successfully!' },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'DELETE'
        }
      }
    )
  } catch {
    return NextResponse.json(
      { error: 'Internal server error!' },
      { status: 500 }
    )
  }
}

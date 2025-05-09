import { NextResponse } from 'next/server'

import { collectionUpdate } from '@/src/shared/db'

export async function PATCH(req: Request) {
  try {
    const body = await req.json()

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { error: 'Missing recipe data' },
        { status: 400 }
      )
    }

    const editCollection = {
      id: body.id,
      name: body.name,
      description: body.description,
      user_id: body.user_id,
      recipes: body.recipes
    }

    const result = await collectionUpdate(editCollection)

    if (!result) {
      return NextResponse.json(
        { error: 'Failed to update collection!' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Collection is updated successfully!', data: result },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { error: 'Internal server error - please try again later!' },
      { status: 500 }
    )
  }
}

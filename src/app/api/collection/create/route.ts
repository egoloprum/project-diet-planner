import { NextResponse } from 'next/server'

import { collectionCreate } from '@/src/shared/db'
import { Collection } from '@/src/shared/model'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { error: 'Missing collection data' },
        { status: 400 }
      )
    }

    const newCollection: Omit<Collection, 'id'> = {
      name: body.name,
      description: body.description,
      user_id: body.userId,
      recipes: []
    }

    const result = await collectionCreate(newCollection)

    if (!result) {
      return NextResponse.json(
        { error: 'Failed to create collection' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Collection created successfully', data: result },
      { status: 201 }
    )
  } catch {
    return NextResponse.json(
      { error: 'Internal server error - please try again later' },
      { status: 500 }
    )
  }
}

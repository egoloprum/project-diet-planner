import { NextResponse } from 'next/server'

import { collectionDelete } from '@/src/shared/db'

export async function DELETE(req: Request) {
  try {
    const body = await req.json()

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 })
    }

    const { collectionId } = body

    const result = await collectionDelete(collectionId)
    if (!result) {
      return NextResponse.json(
        { error: 'Failed to delete collection' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Collection is deleted successfully' },
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
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

import { NextResponse } from 'next/server'

import { blogDelete } from '@/src/entities/blog'

export async function DELETE(req: Request) {
  try {
    const body = await req.json()

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 })
    }

    const { blogId } = body

    const result = await blogDelete(blogId)
    if (!result) {
      return NextResponse.json(
        { error: 'Failed to delete blog!' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Blog is deleted successfully!' },
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

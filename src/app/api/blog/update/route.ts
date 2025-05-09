import { NextResponse } from 'next/server'

import { Blog, blogUpdate } from '@/src/entities/blog'

export async function PATCH(req: Request) {
  try {
    const body = await req.json()

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ error: 'Missing blog data' }, { status: 400 })
    }

    const newBlog: Omit<Blog, 'created_at'> = {
      id: body.id,
      name: body.name,
      description: body.description,
      user_id: body.userId,
      list: body.list
    }

    const result = await blogUpdate(newBlog)

    if (!result) {
      return NextResponse.json(
        { error: 'Failed to update blog!' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Blog updated successfully!', data: result },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { error: 'Internal server error - please try again later!' },
      { status: 500 }
    )
  }
}

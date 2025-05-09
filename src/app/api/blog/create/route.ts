import { NextResponse } from 'next/server'

import { Blog, blogCreate } from '@/src/entities/blog'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ error: 'Missing blog data' }, { status: 400 })
    }

    const newBlog: Omit<Blog, 'id' | 'created_at'> = {
      name: body.name,
      description: body.description,
      user_id: body.userId,
      list: body.list
    }

    const result = await blogCreate(newBlog)

    if (!result) {
      return NextResponse.json(
        { error: 'Failed to create blog!' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Blog created successfully!', data: result },
      { status: 201 }
    )
  } catch {
    return NextResponse.json(
      { error: 'Internal server error - please try again later!' },
      { status: 500 }
    )
  }
}

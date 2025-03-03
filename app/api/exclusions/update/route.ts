import { updateExclusion } from '@/src/app/db/exclusion/exclusionHelper'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { user_id, exclusions } = body

    if (!user_id || !exclusions) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    await updateExclusion(user_id, exclusions)
    return NextResponse.json({ message: 'Exclusions updated' }, { status: 200 })
  } catch (error) {
    console.error('Error updating exclusions:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

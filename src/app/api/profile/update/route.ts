import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'

import { updateProfile } from '@/src/shared/db/profile/profileHelper'
import { Profile } from '@/src/shared/model'

export async function PATCH(req: Request) {
  try {
    const body = await req.json()
    const { email, username, password, userId } = body

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const editProfile: Omit<Profile, 'avatar_url' | 'id' | 'user_id'> = {
      email: email,
      user_name: username,
      password: hashedPassword
    }

    await updateProfile(userId, editProfile)

    return NextResponse.json(
      { message: 'Primary diet updated' },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

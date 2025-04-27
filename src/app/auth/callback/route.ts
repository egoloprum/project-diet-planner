import { NextResponse } from 'next/server'

import {
  createProfile,
  createWeightTracker,
  getProfile,
  getWeightByDate
} from '@/src/shared/db'
import { createClient } from '@/src/shared/db/supabase'
import { getTodayDate } from '@/src/shared/lib'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const {
        data: { user }
      } = await supabase.auth.getUser()

      if (!user) {
        return NextResponse.redirect(`${origin}/auth/login`)
      }

      try {
        const profile = await getProfile(user.id)
        if (profile) {
          return NextResponse.redirect(
            profile.is_setup ? `${origin}${next}` : `${origin}/setup`
          )
        }

        const newProfile = await createProfile(user.id)

        if (!newProfile) {
          return NextResponse.redirect(`${origin}/auth/auth-code-error`)
        }

        const today = getTodayDate()
        const weightTracker = await getWeightByDate(user.id, today)

        if (weightTracker) {
          return NextResponse.redirect(`${origin}${next}`)
        }

        const newWeightTracker = await createWeightTracker(user.id, today)

        if (!newWeightTracker) {
          return NextResponse.redirect(`${origin}/auth/auth-code-error`)
        }
      } catch {
        return NextResponse.redirect(`${origin}/auth/auth-code-error`)
      }

      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}

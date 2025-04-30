import { NextResponse } from 'next/server'

import {
  createMenu,
  createProfile,
  createWeightTracker,
  getProfile
} from '@/src/shared/db'
import { createClient } from '@/src/shared/db/supabase'
import { getTodayDate } from '@/src/shared/lib'

type RedirectParams = {
  origin: string
  path?: string
  error?: boolean
}

const handleRedirect = ({
  origin,
  path = '/',
  error = false
}: RedirectParams) => {
  const redirectPath = error ? '/auth/error' : path
  return NextResponse.redirect(`${origin}${redirectPath}`)
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  console.log('origin', origin)

  if (!code) return handleRedirect({ origin, error: true })

  try {
    const supabase = await createClient()
    const { error: authError } =
      await supabase.auth.exchangeCodeForSession(code)

    if (authError) throw new Error('Authentication failed')

    const {
      data: { user }
    } = await supabase.auth.getUser()
    if (!user) return handleRedirect({ origin, path: '/auth/login' })

    const existingProfile = await getProfile(user.id)
    if (existingProfile) {
      return handleRedirect({
        origin,
        path: existingProfile.is_setup ? next : '/setup'
      })
    }

    const [profile, weightTracker, menu] = await Promise.all([
      createProfile(user.id),
      createWeightTracker(user.id, getTodayDate()),
      createMenu(user.id)
    ])

    if (!profile || !weightTracker || !menu) {
      throw new Error('Resource creation failed')
    }

    return handleRedirect({ origin, path: '/setup' })
  } catch {
    return handleRedirect({ origin, error: true })
  }

  // const forwardedHost = request.headers.get('x-forwarded-host')
  // const isLocalEnv = process.env.NODE_ENV === 'development'
  // if (isLocalEnv) {
  //   return NextResponse.redirect(`${origin}${next}`)
  // } else if (forwardedHost) {
  //   return NextResponse.redirect(`https://${forwardedHost}${next}`)
  // } else {
  //   return NextResponse.redirect(`${origin}${next}`)
  // }

  // return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}

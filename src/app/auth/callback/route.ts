import { NextResponse } from 'next/server'

import { createMenu } from '@/src/entities/menu'
import { createProfile, getProfile } from '@/src/entities/profile'
import { createWeightTracker } from '@/src/entities/weightTracker'
import { createClient } from '@/src/shared/db/supabase'
import { getTodayDate } from '@/src/shared/lib'

type RedirectParams = {
  path?: string
  error?: boolean
}

const handleRedirect = ({ path = '/', error = false }: RedirectParams) => {
  const redirectPath = error ? '/auth/error' : path
  return NextResponse.redirect(`${process.env.NEXTAUTH_URL}${redirectPath}`)
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (!code) return handleRedirect({ error: true })

  try {
    const supabase = await createClient()
    const { error: authError } =
      await supabase.auth.exchangeCodeForSession(code)

    if (authError) throw new Error('Authentication failed!')

    const {
      data: { user }
    } = await supabase.auth.getUser()
    if (!user) return handleRedirect({ path: '/auth/login' })

    const existingProfile = await getProfile(user.id)
    if (existingProfile) {
      return handleRedirect({
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

    return handleRedirect({ path: '/setup' })
  } catch {
    return handleRedirect({ error: true })
  }
}

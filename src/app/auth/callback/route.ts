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
  test?: string
  path?: string
  error?: boolean
}

const handleRedirect = ({
  test,
  path = '/',
  error = false
}: RedirectParams) => {
  console.log('test', test)
  const redirectPath = error ? '/auth/error' : path
  return NextResponse.redirect(`${process.env.NEXTAUTH_URL}${redirectPath}`)
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (!code) return handleRedirect({ test: '1', error: true })

  try {
    const supabase = await createClient()
    const { error: authError } =
      await supabase.auth.exchangeCodeForSession(code)

    if (authError) throw new Error('Authentication failed')

    const {
      data: { user }
    } = await supabase.auth.getUser()
    if (!user) return handleRedirect({ test: '2', path: '/auth/login' })

    const existingProfile = await getProfile(user.id)
    if (existingProfile) {
      return handleRedirect({
        test: '3',
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

    return handleRedirect({ test: '4', path: '/setup' })
  } catch (error) {
    console.log('error', error)
    return handleRedirect({ test: '5', error: true })
  }
}

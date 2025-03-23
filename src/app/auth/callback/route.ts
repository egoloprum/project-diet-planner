import { NextResponse } from 'next/server'

import { createClient } from '@/src/shared/db/supabase'

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

      if (user) {
        try {
          const { error: profileError } = await supabase
            .from('profile')
            .select('id')
            .eq('user_id', user.id)
            .single()

          if (profileError) {
            const { error: insertError } = await supabase
              .from('profile')
              .insert({
                user_id: user.id,
                avatar_url: `/pics/${Math.floor(Math.random() * (24 - 1 + 1)) + 1}.png`
              })

            if (insertError) {
              console.error('Profile creation error:', insertError)
              return NextResponse.redirect(`${origin}/auth/auth-code-error`)
            }
          }
        } catch {}
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

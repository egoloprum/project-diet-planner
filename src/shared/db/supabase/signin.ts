'use server'

import { redirect } from 'next/navigation'

import { createClient } from '.'

export const signInWithGoogle = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXTAUTH_URL}/auth/callback`
    }
  })

  if (data) {
    return redirect(data.url as string)
  }
  if (error) {
    throw error
  }
}

export const signInWithAnon = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInAnonymously()

  if (data) {
    return redirect('/planner')
  }
  if (error) {
    throw error
  }
}

export const signOut = async () => {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()
  if (error) {
    throw error
  }
  return redirect('/')
}

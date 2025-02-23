"use server"

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '.'


export const signInWithGoogle = async () => {
  const origin = (await headers()).get('origin')
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback`,
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

  const {data, error} = await supabase
    .auth
    .signInAnonymously()
  
  if (data) {
    console.log({ data }, "data")
    return redirect('/')
  }
  if (error) {
    throw error
  }
}

export const signOut = async () => {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()
  if (error) { throw error }
  return redirect('/')
}

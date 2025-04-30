'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { createClient } from '.'

export const signInWithGoogle = async () => {
  const origin = (await headers()).get('origin')
  const supabase = await createClient()

  const getURL = () => {
    let url =
      process?.env?.NEXT_PUBLIC_SITE_URL ??
      process?.env?.NEXT_PUBLIC_VERCEL_URL ??
      'http://localhost:3000/'

    url = url.startsWith('http') ? url : `https://${url}`

    url = url.endsWith('/') ? url : `${url}/`
    return url
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: getURL()
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

import { redirect } from 'next/navigation'

import { createClient } from '@/src/shared/db/supabase'

import { getProfile } from '../entities/profile'

export default async function Home() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  const user = data.user

  if (user) {
    const profile = await getProfile(user.id)

    if (profile?.is_setup) {
      return redirect('/planner')
    } else {
      return redirect('/setup')
    }
  }

  return <div>qweqw</div>
}

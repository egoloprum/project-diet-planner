import { redirect } from 'next/navigation'

import { createClient } from '@/src/shared/db/supabase'

export default async function Home() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  if (data.user) {
    return redirect('/planner')
  }

  return <div>qweqw</div>
}

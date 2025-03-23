import { redirect } from 'next/navigation'

import { LoginForm } from '@/src/features/loginForm'
import { createClient } from '@/src/shared/db/supabase'

const page = async ({}) => {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  if (data.user) {
    return redirect('/planner')
  }

  return (
    <div className="h-[calc(100vh-84px)] flex justify-center items-center">
      <LoginForm />
    </div>
  )
}

export default page

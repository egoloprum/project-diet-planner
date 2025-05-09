import { redirect } from 'next/navigation'

import { LoginForm } from '@/src/features/login-form'
import { createClient } from '@/src/shared/db/supabase'

const page = async ({}) => {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  if (data.user) {
    return redirect('/planner')
  }

  return (
    <div className="h-[calc(100vh-112px)] flex justify-center items-center">
      <LoginForm />
    </div>
  )
}

export default page

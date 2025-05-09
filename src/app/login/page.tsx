import { redirect } from 'next/navigation'

import { LoginBtn } from '@/src/features/auth'
import { createClient } from '@/src/shared/db/supabase'

const page = async ({}) => {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  if (data.user) {
    return redirect('/planner')
  }

  return (
    <div className="h-[calc(100vh-112px)] flex justify-center items-center">
      <section className="border-2 rounded-xl p-4 max-w-96 w-full flex flex-col gap-4 mt-6">
        <h1 className="font-bold text-center text-base md:text-xl lg:text-2xl">
          Sign up or Log in
        </h1>
        <p className="text-gray-500 text-sm md:text-base">
          Using google provider secures the user data, integraty of application.
        </p>
        <span className="my-4 border-b-2"></span>
        <LoginBtn />
      </section>
    </div>
  )
}

export default page

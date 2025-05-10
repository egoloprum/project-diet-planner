import Image from 'next/image'
import { redirect } from 'next/navigation'

import { getMenu } from '@/src/entities/menu'
import { getProfile } from '@/src/entities/profile'
import { SetupMealsForm, SetupProgress } from '@/src/features/setup'
import { createClient } from '@/src/shared/db/supabase'

const page = async ({}) => {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    redirect('/login')
  }

  const user_id = data.user.id
  const profile = await getProfile(user_id)

  if (!profile) {
    redirect('/login')
  }

  if (profile.is_setup) {
    redirect('/planner')
  }

  const menu = await getMenu(user_id)

  if (!menu) {
    redirect('/login')
  }

  return (
    <>
      <div className="min-h-[calc(100vh-25vh)] mb-6 flex flex-col md:flex-row gap-4 md:gap-8 justify-center items-center overflow-auto">
        <Image
          className="select-none"
          src="/setup/setup-meals.webp"
          height={250}
          width={150}
          alt="setup-meals"
        />
        <div className="max-w-[600px] flex flex-col gap-4">
          <section>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold capitalize">
              Which meals do you eat each day?
            </h1>
            <p className="text-gray-500 text-sm sm:text-base">
              You can edit individual meal settings or create brand new meal
              types later.
            </p>
          </section>

          <SetupMealsForm userId={user_id} menu={menu} />
        </div>
      </div>
      <SetupProgress userId={user_id} />
    </>
  )
}

export default page

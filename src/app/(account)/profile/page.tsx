import Image from 'next/image'
import { redirect } from 'next/navigation'

import { SetupMealsForm } from '@/src/features/setup-meals-form'
import { NutritionCard } from '@/src/shared/components/nutritionCard'
import { getMenu, getProfile } from '@/src/shared/db'
import { createClient } from '@/src/shared/db/supabase'

const page = async ({}) => {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    redirect('/login')
  }

  const user_id = data.user.id
  const profile = await getProfile(user_id)

  if (!profile?.is_setup) {
    redirect('/setup')
  }

  const menu = await getMenu(user_id)

  if (!menu) {
    redirect('/login')
  }

  return (
    <div className="min-h-[calc(100vh-185.5px)] flex flex-col md:flex-row gap-4 md:gap-8 justify-center items-center overflow-auto">
      <Image
        src="/image_profile.png"
        height={250}
        width={250}
        alt="profile"
        className="select-none"
      />
      <div className="max-w-[600px] flex flex-col gap-4">
        <div>
          <h1 className="text-base sm:text-lg md:text-xl font-bold capitalize">
            Profile
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Changing this data will affect your other settings such as
            nutritions settings.
          </p>
        </div>

        <NutritionCard profile={profile} />
        <SetupMealsForm userId={user_id} menu={menu} isStatic={true} />
      </div>
    </div>
  )
}

export default page

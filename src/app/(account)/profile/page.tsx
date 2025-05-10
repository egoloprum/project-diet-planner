import Image from 'next/image'
import { redirect } from 'next/navigation'

import { getMenu } from '@/src/entities/menu'
import { getProfile } from '@/src/entities/profile'
import { getWeightByUser } from '@/src/entities/weightTracker'
import { SetupMealsForm } from '@/src/features/setup'
import { createClient } from '@/src/shared/db/supabase'
import { NutritionCard } from '@/src/widgets/nutrition'
import { WeightChart } from '@/src/widgets/profile'

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

  const weights = await getWeightByUser(user_id)

  if (!weights?.length) {
    redirect('/login')
  }

  return (
    <div className="min-h-[calc(100vh-185.5px)] flex flex-col md:flex-row gap-4 md:gap-8 justify-center items-center overflow-auto">
      <div className="flex flex-col sm:flex-row md:flex-col gap-4">
        <Image
          src="/image_profile.png"
          height={250}
          width={250}
          alt="profile"
          className="select-none"
        />
        <WeightChart weights={weights} />
      </div>
      <div className="max-w-[600px] flex flex-col gap-4">
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold capitalize">
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

import Image from 'next/image'
import { redirect } from 'next/navigation'

import { getProfile } from '@/src/entities/profile'
import { createClient } from '@/src/shared/db/supabase'
import { NutritionCard } from '@/src/widgets/nutrition'

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

  return (
    <div className="min-h-[calc(100vh-185.5px)] flex flex-col md:flex-row gap-4 md:gap-8 justify-center items-center overflow-auto">
      <Image
        className="select-none"
        src="/setup/setup-nutrition.webp"
        height={250}
        width={150}
        alt="setup-nutrition"
      />
      <div className="max-w-[600px] flex flex-col gap-4">
        <section>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold capitalize">
            Your Nutrition Targets
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            We&apos;ve estimated your daily nutrition targets based on your
            profile. You can edit these targets at any time.
          </p>
        </section>

        <NutritionCard profile={profile} />
      </div>
    </div>
  )
}

export default page

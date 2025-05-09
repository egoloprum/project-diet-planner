import Image from 'next/image'
import { redirect } from 'next/navigation'

import { getProfile } from '@/src/entities/profile'
import { getWeightByDate } from '@/src/entities/weightTracker'
import {
  ActivityLevelForm,
  AgeForm,
  GenderForm,
  HeightForm,
  WeightForm
} from '@/src/features/setup'
import { createClient } from '@/src/shared/db/supabase'
import { getTodayDate } from '@/src/shared/lib'

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

  const today = getTodayDate()
  const weightTracker = await getWeightByDate(user_id, today)

  return (
    <div className="min-h-[calc(100vh-185.5px)] flex flex-col md:flex-row gap-4 md:gap-8 justify-center items-center overflow-auto">
      <Image
        className="select-none"
        src="/setup/setup-profile.webp"
        height={250}
        width={150}
        alt="setup-profile"
      />
      <div className="max-w-[600px] flex flex-col gap-4">
        <section>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold capitalize">
            Tell us about yourself
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            This information lets us estimate your nutrition requirements for
            each day.
          </p>
        </section>

        <GenderForm profile={profile} weight={weightTracker?.weight || 70} />
        <AgeForm profile={profile} weight={weightTracker?.weight || 70} />
        <HeightForm profile={profile} weight={weightTracker?.weight || 70} />
        <WeightForm profile={profile} weight={weightTracker?.weight || 70} />
        <ActivityLevelForm
          profile={profile}
          weight={weightTracker?.weight || 70}
        />
      </div>
    </div>
  )
}

export default page

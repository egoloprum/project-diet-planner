import Image from 'next/image'
import { redirect } from 'next/navigation'

import { ActivityLevelForm } from '@/src/features/(setup-profile)/activity-level-form'
import { AgeForm } from '@/src/features/(setup-profile)/age-form'
import { GenderForm } from '@/src/features/(setup-profile)/gender-form'
import { HeightForm } from '@/src/features/(setup-profile)/height-form'
import { WeightForm } from '@/src/features/(setup-profile)/weight-form/weightForm'
import { getWeightByDate } from '@/src/shared/db'
import { getProfile } from '@/src/shared/db/profile/profileHelper'
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

  const today = getTodayDate()
  const weightTracker = await getWeightByDate(user_id, today)

  return (
    <div className="min-h-[calc(100vh-185.5px)] flex flex-col md:flex-row gap-4 md:gap-8 justify-center items-center overflow-auto">
      <Image
        src="/setup/setup-profile.webp"
        height={250}
        width={150}
        alt="setup-profile"
      />
      <div className="max-w-[600px] flex flex-col gap-4">
        <div>
          <h1 className="text-base sm:text-lg md:text-xl font-bold capitalize">
            Tell us about yourself
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            This information lets us estimate your nutrition requirements for
            each day.
          </p>
        </div>

        <GenderForm userId={user_id} gender={profile.gender} />
        <AgeForm userId={user_id} age={profile.age} />
        <HeightForm userId={user_id} height={profile.height} />
        <WeightForm userId={user_id} weight={weightTracker?.weight || 0} />
        <ActivityLevelForm
          userId={user_id}
          activityLevel={profile.activity_level}
        />
      </div>
    </div>
  )
}

export default page

import Image from 'next/image'
import { redirect } from 'next/navigation'

import { ActivityLevelForm } from '@/src/features/(setup-profile)/activity-level-form'
import { AgeForm } from '@/src/features/(setup-profile)/age-form'
import { EmailForm } from '@/src/features/(setup-profile)/email-form'
import { GenderForm } from '@/src/features/(setup-profile)/gender-form'
import { HeightForm } from '@/src/features/(setup-profile)/height-form'
import { UsernameForm } from '@/src/features/(setup-profile)/username-form'
import { WeightForm } from '@/src/features/(setup-profile)/weight-form'
import { SetupGoalForm } from '@/src/features/setup-goal-form'
import { NotFound } from '@/src/shared/components/notFound'
import { getProfile, getWeightByDate } from '@/src/shared/db'
import { createClient } from '@/src/shared/db/supabase'
import { getTodayDate } from '@/src/shared/lib'

const page = async ({}) => {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  const user = data.user

  if (!user || !user.email) {
    return (
      <NotFound
        href=""
        text="This page can not be accessed by unverified user."
      />
    )
  }

  const profile = await getProfile(user.id)

  if (!profile) {
    redirect('/login')
  }

  const today = getTodayDate()
  const weightTracker = await getWeightByDate(user.id, today)

  if (!profile) {
    return <NotFound href="" text="Something went wrong. Try again later." />
  }

  return (
    <div className="min-h-[calc(100vh-185.5px)] flex flex-col md:flex-row gap-4 md:gap-8 justify-center items-center overflow-auto">
      <div className="max-w-[600px] w-full flex flex-col gap-4">
        <Image
          className="select-none"
          src="/image_profile_settings.png"
          height={250}
          width={250}
          alt="profile-settings"
        />
        <div className="flex flex-col gap-4">
          <UsernameForm profile={profile} />
          <EmailForm email={user.email} />
        </div>
      </div>
      <div className="max-w-[600px] flex flex-col gap-4">
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold capitalize">
            Setup your personal data
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Changing this data will affect your other settings such as
            nutritions settings.
          </p>
        </div>

        <GenderForm profile={profile} weight={weightTracker?.weight || 70} />
        <AgeForm profile={profile} weight={weightTracker?.weight || 70} />
        <HeightForm profile={profile} weight={weightTracker?.weight || 70} />
        <WeightForm profile={profile} weight={weightTracker?.weight || 70} />

        <ActivityLevelForm
          profile={profile}
          weight={weightTracker?.weight || 70}
        />

        <div className="border-b-2"></div>

        <SetupGoalForm profile={profile} weight={weightTracker?.weight || 70} />
      </div>
    </div>
  )
}

export default page

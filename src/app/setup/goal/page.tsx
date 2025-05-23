import Image from 'next/image'
import { redirect } from 'next/navigation'

import { getProfile } from '@/src/entities/profile'
import { getWeightByDate } from '@/src/entities/weightTracker'
import { SetupGoalForm, SetupProgress } from '@/src/features/setup'
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
    <>
      <div className="min-h-[calc(100vh-25vh)] mb-6 flex flex-col md:flex-row gap-4 md:gap-8 justify-center items-center overflow-auto">
        <Image
          className="select-none"
          src="/setup/setup-goal.webp"
          height={250}
          width={150}
          alt="setup-goal"
        />
        <div className="max-w-[600px] flex flex-col gap-4">
          <section>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold capitalize">
              What is your goal?
            </h1>
            <p className="text-gray-500 text-sm sm:text-base">
              We&apos;ll adjust your daily nutrition targets to match your
              goals.
            </p>
          </section>

          <SetupGoalForm
            profile={profile}
            weight={weightTracker?.weight || 70}
          />

          <p className="text-gray-500 text-sm ">
            The calorie target we suggest will be based on your goals. If you
            select &quot;Lose fat&quot;, the target will be 20% below your
            maintenance calories, or if you select &quot;Build muscle&quot;, the
            target calories will be 15% above maintenance.
          </p>
        </div>
      </div>
      <SetupProgress userId={user_id} />
    </>
  )
}

export default page

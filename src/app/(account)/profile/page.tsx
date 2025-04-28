import { redirect } from 'next/navigation'

import { getProfile } from '@/src/shared/db'
import { createClient } from '@/src/shared/db/supabase'
import { GoalTracker } from '@/src/widgets/(profile)/goalTracker'
import { NutritionTracker } from '@/src/widgets/(profile)/nutritionTracker'
import { SocialTracker } from '@/src/widgets/(profile)/socialTracker'
import { StatsTracker } from '@/src/widgets/(profile)/statsTracker'
import { WeightChart } from '@/src/widgets/(profile)/weightChart'
import { WeightTracker } from '@/src/widgets/(profile)/weightTracker'

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

  if (data.user?.email) {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap gap-4">
          <WeightTracker user={data.user} />
          <WeightChart userId={user_id} />
          <SocialTracker userId={user_id} />
        </div>

        <div className="flex flex-wrap gap-4">
          <GoalTracker userId={user_id} />
          <NutritionTracker userId={user_id} />
          <StatsTracker userId={user_id} />
        </div>
      </div>
    )
  }

  return <p>This page can not be accessed by unverified user.</p>
}

export default page

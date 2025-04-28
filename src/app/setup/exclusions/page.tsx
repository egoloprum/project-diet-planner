import Image from 'next/image'
import { redirect } from 'next/navigation'

import { getExclusion, getProfile } from '@/src/shared/db'
import { createClient } from '@/src/shared/db/supabase'
import { SetupExclusionList } from '@/src/widgets/(exclusion)/setupList'

const page = async ({}) => {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    redirect('/login')
  }

  const user_id = data.user.id
  const profile = await getProfile(user_id)

  if (profile && profile.is_setup) {
    redirect('/planner')
  }

  const selectedExclusions = await getExclusion(user_id)

  return (
    <div className="min-h-[calc(100vh-185.5px)] flex flex-col md:flex-row gap-4 md:gap-8 justify-center items-center overflow-auto">
      <Image
        src="/setup/setup-exclusions.webp"
        height={250}
        width={150}
        alt="setup-exclusions"
      />
      <div className="max-w-[600px] flex flex-col gap-4">
        <div>
          <h1 className="text-base sm:text-lg md:text-xl font-bold capitalize">
            Are there foods you avoid?
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            This may be due to allergies or any other reason.
          </p>
        </div>

        <SetupExclusionList
          selectedExclusions={selectedExclusions?.list ?? []}
          user_id={user_id}
        />

        <p className="text-gray-500 text-sm sm:text-base">
          You can fully configure your Food Exclusions later, including setting
          custom exclusions.
        </p>
      </div>
    </div>
  )
}

export default page

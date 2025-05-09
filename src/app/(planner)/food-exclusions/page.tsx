import Image from 'next/image'
import { redirect } from 'next/navigation'

import { getExclusion, getProfile } from '@/src/shared/db'
import { createClient } from '@/src/shared/db/supabase'
import { DefaultExclusionList } from '@/src/widgets/(exclusion)/defaultList'
import { SelectedExclusionList } from '@/src/widgets/(exclusion)/selectedList'

const page = async ({}) => {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    return redirect('/login')
  }

  const user_id = data.user.id
  const profile = await getProfile(user_id)

  if (!profile?.is_setup) {
    redirect('/setup')
  }

  const selectedExclusions = await getExclusion(user_id)

  return (
    <div className="min-h-[calc(100vh-185.5px)] flex flex-col gap-4 md:gap-8 justify-center items-center overflow-auto">
      <div className="flex flex-wrap justify-center gap-4">
        <Image
          className="select-none"
          src="/setup/setup-exclusions.webp"
          height={150}
          width={200}
          alt="setup-exclusions"
        />
        <div className="max-w-[600px] flex flex-col gap-4">
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold capitalize">
              What do you like to eat?
            </h1>
            <p className="text-gray-500 text-sm sm:text-base">
              Add exclusions to filter out recipes from the generator
              suggestions. Any recipes that match their title or ingredients
              will not be included in your plans.
            </p>
          </div>
          <SelectedExclusionList
            selectedExclusions={selectedExclusions?.list ?? []}
          />
        </div>
      </div>

      <DefaultExclusionList
        selectedExclusions={selectedExclusions?.list ?? []}
        user_id={user_id}
      />
    </div>
  )
}

export default page

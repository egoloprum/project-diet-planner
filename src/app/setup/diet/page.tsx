import Image from 'next/image'
import { redirect } from 'next/navigation'

import { Diet, getDiet } from '@/src/entities/diet'
import { getProfile } from '@/src/entities/profile'
import { SetupProgress } from '@/src/features/setup'
import { createClient } from '@/src/shared/db/supabase'
import { DietList } from '@/src/widgets/diet'

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
  const selectedDiet = (await getDiet(user_id)) as Diet

  return (
    <>
      <div className="min-h-[calc(100vh-25vh)] mb-6 flex flex-col md:flex-row gap-4 md:gap-8 justify-center items-center overflow-auto">
        <Image
          className="select-none"
          src="/setup/setup-diet.webp"
          height={250}
          width={250}
          alt="setup-diet"
        />
        <div className="max-w-[600px] flex flex-col gap-4">
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold capitalize">
              What do you like to eat?
            </h1>
            <p className="text-gray-500 text-sm sm:text-base">
              Choose from a primary diet type. You can exclude specific foods in
              the next step.
            </p>
          </div>
          <DietList
            selectedDiet={selectedDiet}
            user_id={user_id}
            className="flex flex-col gap-2 md:gap-4"
          />

          <p className="text-gray-500 text-sm sm:text-base">
            Don&apos;t see your preferred diet? Choose &quot;Anything&quot; and
            then customize it later.
          </p>
        </div>
      </div>
      <SetupProgress userId={user_id} />
    </>
  )
}

export default page

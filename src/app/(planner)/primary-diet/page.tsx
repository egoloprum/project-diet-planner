import Image from 'next/image'
import { redirect } from 'next/navigation'

import { getPrimaryDiet, getProfile } from '@/src/shared/db'
import { createClient } from '@/src/shared/db/supabase'
import { PrimaryDiet } from '@/src/shared/model'
import { DietList } from '@/src/widgets/(diet)'

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

  const selectedDiet = (await getPrimaryDiet(user_id)) as PrimaryDiet

  return (
    <div className="min-h-[calc(100vh-185.5px)] flex flex-col md:flex-row gap-4 md:gap-8 justify-center items-center">
      <Image
        className="select-none"
        src="/setup/setup-diet.webp"
        height={250}
        width={250}
        alt="setup-diet"
      />
      <div className="flex flex-col gap-4 xl:w-[60%]">
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
          className="grid grid-cols-1 gap-2 md:gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 w-full"
        />

        <p className="text-gray-500 text-sm sm:text-base">
          Don&apos;t see your preferred diet? Choose &quot;Anything&quot; and
          then customize it later.
        </p>
      </div>
    </div>
  )
}

export default page

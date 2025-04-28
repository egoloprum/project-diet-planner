import Link from 'next/link'
import { redirect } from 'next/navigation'

import { getProfile } from '@/src/shared/db'
import { getPrimaryDiet } from '@/src/shared/db/diet/dietHelper'
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
    <div className="flex flex-col gap-6 min-h-[calc(100vh-200px)]">
      <menu>
        <h1 className="font-bold text-lg sm:text-xl md:text-2xl">
          Primary Diet
        </h1>
        <p className="text-sm sm:text-base">
          We will base your meals off this main main diet type. Choose Anything
          to customize your own unique diet from scratch and set specific
          exclusions from the
          <Link
            href="/food-exclusions"
            className="underline underline-offset-4 ml-2">
            Exclusions menu screen.
          </Link>
        </p>
      </menu>

      <DietList
        selectedDiet={selectedDiet}
        user_id={user_id}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 grid-auto-rows-fr"
      />
    </div>
  )
}

export default page

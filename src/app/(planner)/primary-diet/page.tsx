import Link from 'next/link'
import { redirect } from 'next/navigation'

import { getPrimaryDiet } from '@/src/shared/db/diet/dietHelper'
import { createClient } from '@/src/shared/db/supabase'
import { DietList } from '@/src/widgets/(diet)'
import { PrimaryDiet } from '@/src/shared/model'

const page = async ({}) => {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    redirect('/login')
  }

  const user_id = data.user.id
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

      <DietList selectedDiet={selectedDiet} user_id={user_id} />
    </div>
  )
}

export default page

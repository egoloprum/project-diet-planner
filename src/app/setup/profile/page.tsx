import Image from 'next/image'
import { redirect } from 'next/navigation'

import { SetupProfileForm } from '@/src/features/setup-profile-form'
import { createClient } from '@/src/shared/db/supabase'

const page = async ({}) => {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    redirect('/login')
  }

  const user_id = data.user.id

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

        <SetupProfileForm userId={user_id} />
      </div>
    </div>
  )
}

export default page

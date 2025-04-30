import Image from 'next/image'

import { NotFound } from '@/src/shared/components/notFound'
import { createClient } from '@/src/shared/db/supabase'

const page = async ({}) => {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  const user = data.user

  if (!user) {
    return <NotFound href="/login" />
  }

  return (
    <div className="min-h-[calc(100vh-185.5px)] flex justify-center items-center overflow-auto">
      <div className="max-w-[600px] flex flex-col gap-4">
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold capitalize">
            Set up your account
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Let&apos;s get started setting up your account! We&apos;ll need to
            know a little bit about you to make food recommendations.
          </p>
        </div>
        <ul className="w-full flex flex-col gap-4">
          <li className="flex gap-4 items-center border-b-2 pb-2">
            <Image
              className="select-none"
              src="/your-diet.webp"
              height={100}
              width={100}
              alt="your diet"
            />
            <div className="flex flex-col">
              <p className="text-sm sm:text-base font-bold">Your diet</p>
              <span className="text-gray-500 text-sm sm:text-base">
                Enter dietary restrictions or allergies
              </span>
            </div>
          </li>
          <li className="flex gap-4 items-center border-b-2 pb-2">
            <Image
              className="select-none"
              src="/about-you.webp"
              height={100}
              width={100}
              alt="about you"
            />
            <div className="flex flex-col">
              <p className="text-sm sm:text-base font-bold">About you</p>
              <span className="text-gray-500 text-sm sm:text-base">
                Your height, weight, and future goals
              </span>
            </div>
          </li>
          <li className="flex gap-4 items-center">
            <Image
              className="select-none"
              src="/your-meals.webp"
              height={100}
              width={100}
              alt="your meals"
            />
            <div className="flex flex-col">
              <p className="text-sm sm:text-base font-bold">Your meals</p>
              <span className="text-gray-500 text-sm sm:text-base">
                The meals you eat in a day and your favorite dishes
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default page

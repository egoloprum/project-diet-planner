import Image from 'next/image'
import { redirect } from 'next/navigation'

import { createClient } from '@/src/shared/db/supabase'

import { getProfile } from '../entities/profile'

export default async function Home() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  const user = data.user

  if (user) {
    const profile = await getProfile(user.id)

    if (profile?.is_setup) {
      return redirect('/planner')
    } else {
      return redirect('/setup')
    }
  }

  return (
    <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-10 mx-4 sm:mx-12 md:mx-16 lg:mx-20">
      <div className="flex flex-col justify-center lg:flex-row gap-4 sm:gap-6 md:gap-8 lg:gap-10 my-10">
        <div className="w-full lg:max-w-[600px] flex flex-col gap-8 sm:gap-10 md:gap-12 lg:gap-14 z-10">
          <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            Put your diet on autopilot.
          </h1>
          <p className="text-base sm:text-xl text-gray-500">
            Eat This Much creates personalized meal plans based on your food
            preferences, budget, and schedule. Reach your diet and nutritional
            goals with our calorie calculator, weekly meal plans, grocery lists
            and more.
          </p>
        </div>
        <div className="flex items-center justify-end">
          <Image
            width={400}
            height={250}
            className=""
            src="/home/image_home_plane.webp"
            alt="plane"
          />
        </div>
      </div>
      <span className="border-b-2 w-full"></span>
      <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 my-10">
        <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold">
          Eating smart has never been easier
        </h2>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          <li className="flex items-center gap-4 max-w-[600px]">
            <Image
              width={100}
              height={100}
              className="h-[75px] w-[75px]"
              src="/home/image_home_style.webp"
              alt="style"
            />
            <div className="flex flex-col gap-2">
              <p className="text-xl font-semibold">
                Follow any eating style or create your own
              </p>
              <span className="text-gray-500">
                You can customize popular eating styles like vegan and paleo to
                match your needs and preferences.
              </span>
            </div>
          </li>
          <li className="flex items-center gap-4 max-w-[600px]">
            <Image
              width={100}
              height={100}
              className="h-[75px] w-[75px]"
              src="/home/image_home_waste.webp"
              alt="waste"
            />
            <div className="flex flex-col gap-2">
              <p className="text-xl font-semibold">Reduce food waste</p>
              <span className="text-gray-500">
                Planning ahead means less produce going bad in the fridge. Add
                what you already own to the virtual pantry and our algorithms
                will use it up with priority.
              </span>
            </div>
          </li>
          <li className="flex items-center gap-4 max-w-[600px]">
            <Image
              width={100}
              height={100}
              className="h-[75px] w-[75px]"
              src="/home/image_home_anxiety.webp"
              alt="anxiety"
            />
            <div className="flex flex-col gap-2">
              <p className="text-xl font-semibold">
                Take the anxiety out of picking what to eat
              </p>
              <span className="text-gray-500">
                Make the important decisions ahead of time and on your own
                schedule. Then there&apos;s nothing to worry about when
                it&apos;s time to eat.
              </span>
            </div>
          </li>
          <li className="flex items-center gap-4 max-w-[600px]">
            <Image
              width={100}
              height={100}
              className="h-[75px] w-[75px]"
              src="/home/image_home_list.webp"
              alt="list"
            />
            <div className="flex flex-col gap-2">
              <p className="text-xl font-semibold">
                Automatic personal tracker
              </p>
              <span className="text-gray-500">
                No more anxiety on worrying about skipping a day to fill your
                weight. System already takes care of it for you.
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

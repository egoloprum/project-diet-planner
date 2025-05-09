import Image from 'next/image'
import { redirect } from 'next/navigation'

import { getProfile } from '@/src/entities/profile'
import { createClient } from '@/src/shared/db/supabase'

const page = async ({}) => {
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
            How We Automate Your Meal Planning
          </h1>
          <div className="flex flex-col gap-4 text-base sm:text-xl text-gray-500">
            <p className="">
              Eat This Much helps you with the two most important things to make
              your healthy diet a success:
            </p>
            <ul className="pl-8 flex flex-col gap-4">
              <ol>
                1. Turn meal planning into an effortless and magical experience.
              </ol>
              <ol>
                2. Provide an endless supply of delicious recipes specific to
                your needs.
              </ol>
            </ul>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <Image
            width={400}
            height={250}
            className=""
            src="/docs/image_docs_main.png"
            alt="main"
          />
        </div>
      </div>
      <span className="border-b-2 w-full"></span>

      <div className="flex justify-center my-10">
        <div className="max-w-[1000px] relative">
          <p className="absolute left-[2.5%] top-[-20px] px-2 py-1 rounded-xl bg-purple-500 text-white">
            Did you know?
          </p>
          <p className="p-4 bg-gray-200 rounded-xl">
            <strong className="mr-1">
              We have a database of over 30,000 recipes!
            </strong>
            When you&apos;re focused on your diet, it&apos;s important to know
            the nutritional breakdown of the foods you&apos;re eating. System
            takes the guesswork out of this process by supplying you with an
            easily searchable database that breaks down all these facts in a
            snap. It&apos;s like having a little nutrition label for any food or
            meal you can imagine! (And when you simply follow the plan,
            there&apos;s no tracking needed :)
          </p>
        </div>
      </div>

      <span className="border-b-2 w-full"></span>

      <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 my-10">
        <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold">
          Get Started In 4 Easy Steps
        </h2>

        <ul className="grid grid-cols-1 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          <li className="flex items-center gap-4 max-w-[1000px]">
            <Image
              width={100}
              height={100}
              className="h-[100px] w-[100px] sm:h-[150px] sm:w-[150px]"
              src="/docs/image_docs_create.png"
              alt="create"
            />
            <div className="flex flex-col gap-4">
              <p className="text-xl font-semibold">1. Create</p>
              <span className="text-gray-500">
                Tell us about yourself, your diet preferences, and your goals.
                We&apos;ll create meal plans specific to your needs in seconds!
                You always have the option to tweak your settings later.
              </span>
            </div>
          </li>
          <li className="flex items-center gap-4 max-w-[1000px]">
            <div className="flex flex-col gap-4">
              <p className="text-xl font-semibold">2. Collect</p>
              <span className="text-gray-500">
                Review your plan to make sure everything looks good, swapping
                out anything you don&apos;t like. Then, use the grocery list to
                shop for your ingredients.
              </span>
            </div>
            <Image
              width={100}
              height={100}
              className="h-[100px] w-[100px] sm:h-[150px] sm:w-[150px]"
              src="/docs/image_docs_collect.png"
              alt="collect"
            />
          </li>
          <li className="flex items-center gap-4 max-w-[1000px]">
            <Image
              width={100}
              height={100}
              className="h-[100px] w-[100px] sm:h-[150px] sm:w-[150px]"
              src="/docs/image_docs_cook.png"
              alt="cook"
            />
            <div className="flex flex-col gap-4">
              <p className="text-xl font-semibold">3. Cook</p>
              <span className="text-gray-500">
                Enjoy making and eating delicious meals without the stress of
                planning. Not only will you know you&apos;re eating better,
                you&apos;ll have more time and energy for other things.
              </span>
            </div>
          </li>
          <li className="flex items-center gap-4 max-w-[1000px]">
            <div className="flex flex-col gap-4">
              <p className="text-xl font-semibold">4. Conquer</p>
              <span className="text-gray-500">
                Make adjustments to your preferences, discover new meals, or put
                your favorites on repeat. Review nutrition stats, track weight
                progress, and achieve your goals!
              </span>
            </div>
            <Image
              width={100}
              height={100}
              className="h-[100px] w-[100px] sm:h-[150px] sm:w-[150px]"
              src="/docs/image_docs_conquer.png"
              alt="conquer"
            />
          </li>
        </ul>
      </div>

      <span className="border-b-2 w-full"></span>

      <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 my-10">
        <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold">
          Everything You Need To Stay On Track
        </h2>

        <ul className="grid grid-cols-1 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          <li className="flex flex-col md:flex-row items-center gap-4 max-w-[1000px]">
            <div className="max-h-[350px] max-w-[450px] h-full w-full  grid content-center">
              <Image
                width={400}
                height={150}
                className="aspect-auto min-w-[250px]"
                src="/docs/image_docs_1.png"
                alt="create"
              />
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-xl font-semibold">1. Create account</p>
              <span className="text-gray-500">
                Log in using your google account. System only accepts google
                provider which secures the integraty.
              </span>
            </div>
          </li>
          <li className="flex flex-col md:flex-row-reverse items-center gap-4 max-w-[1000px]">
            <div className="max-h-[350px] max-w-[450px] h-full w-full  grid content-center">
              <Image
                width={400}
                height={150}
                className="aspect-auto min-w-[250px]"
                src="/docs/image_docs_2.png"
                alt="introduction"
              />
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-xl font-semibold">2. Quick introduction</p>
              <span className="text-gray-500">
                This page is only dedicated for next events which will require
                user to input personal data. Inputted data will be processed and
                used to generate nearly accurate plan for user.
              </span>
            </div>
          </li>
          <li className="flex flex-col md:flex-row items-center gap-4 max-w-[1000px]">
            <div className="max-h-[350px] max-w-[450px] h-full w-full  grid content-center">
              <Image
                width={400}
                height={150}
                className="aspect-auto min-w-[250px]"
                src="/docs/image_docs_3.png"
                alt="diet"
              />
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-xl font-semibold">3. Select your diet</p>
              <span className="text-gray-500">
                Selecting diet is basically excluding items and products from
                recipes which makes it not appear on search. By hovering over
                list, you can see which items are excluded in each diet.
              </span>
            </div>
          </li>
          <li className="flex flex-col md:flex-row-reverse items-center gap-4 max-w-[1000px]">
            <div className="max-h-[350px] max-w-[450px] h-full w-full  grid content-center">
              <Image
                width={400}
                height={150}
                className="aspect-auto min-w-[250px]"
                src="/docs/image_docs_4.png"
                alt="exclusion"
              />
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-xl font-semibold">
                4. Exclude unliked products
              </p>
              <span className="text-gray-500">
                Excluding items and products will result in searching recipes
                and generating planner. Too many excluded items might break the
                automatic planner!
              </span>
            </div>
          </li>
          <li className="flex flex-col md:flex-row items-center gap-4 max-w-[1000px]">
            <div className="max-h-[350px] max-w-[450px] h-full w-full  grid content-center">
              <Image
                width={400}
                height={150}
                className="aspect-auto min-w-[250px]"
                src="/docs/image_docs_5.png"
                alt="personal-data"
              />
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-xl font-semibold">5. Personal data</p>
              <span className="text-gray-500">
                Planner works on (Mifflin-St. Jeor Equation) which requires
                these specific data. There is a possibility to generate not
                ideal plan of meals. So try to input as accurate as data.
              </span>
            </div>
          </li>
          <li className="flex flex-col md:flex-row-reverse items-center gap-4 max-w-[1000px]">
            <div className="max-h-[350px] max-w-[450px] h-full w-full  grid content-center">
              <Image
                width={400}
                height={150}
                className="aspect-auto min-w-[250px]"
                src="/docs/image_docs_6.png"
                alt="goal"
              />
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-xl font-semibold">6. Goal</p>
              <span className="text-gray-500">
                Goal is better choice as data to calculate planning meals
                instead of using percentage of body fat which people are not
                usually familiar with.
              </span>
            </div>
          </li>
          <li className="flex flex-col md:flex-row items-center gap-4 max-w-[1000px]">
            <div className="max-h-[350px] max-w-[450px] h-full w-full  grid content-center">
              <Image
                width={400}
                height={150}
                className="aspect-auto min-w-[250px]"
                src="/docs/image_docs_7.png"
                alt="nutritional-targets"
              />
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-xl font-semibold">7. Nutrition targets</p>
              <span className="text-gray-500">
                These nutritional values are result of user&apos;s inputted data
                which will be later used to calculate ideal plan of meals.
              </span>
            </div>
          </li>
          <li className="flex flex-col md:flex-row-reverse items-center gap-4 max-w-[1000px]">
            <div className="max-h-[350px] max-w-[450px] h-full w-full  grid content-center">
              <Image
                width={400}
                height={150}
                className="aspect-auto min-w-[250px]"
                src="/docs/image_docs_8.png"
                alt="meals"
              />
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-xl font-semibold">8. Meals</p>
              <span className="text-gray-500">
                Choose combination of at least 3 meals which will result heavily
                on generating plan of meals.
              </span>
            </div>
          </li>
          <li className="flex flex-col md:flex-row items-center gap-4 max-w-[1000px]">
            <div className="max-h-[350px] max-w-[450px] h-full w-full  grid content-center">
              <Image
                width={400}
                height={150}
                className="aspect-auto min-w-[250px]"
                src="/docs/image_docs_9.png"
                alt="generate-plan"
              />
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-xl font-semibold">9. Generate plan</p>
              <span className="text-gray-500">
                So far so good! Final step will be just clicking on
                &quot;Generate&quot; button.
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default page

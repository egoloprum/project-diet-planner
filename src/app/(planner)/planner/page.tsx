import Image from 'next/image'
import { redirect } from 'next/navigation'

import { DateSelector } from '@/src/features/(planner)/date-selector'
import { GeneratePlanBtn } from '@/src/features/(planner)/generate-plan-btn'
import { SetupMealsForm } from '@/src/features/setup-meals-form'
import { NotFound } from '@/src/shared/components/notFound'
import { getMenu, getPlannerByDate, getProfile } from '@/src/shared/db'
import { createClient } from '@/src/shared/db/supabase'
import {
  calculateMealCaloriesPercentages,
  extractDate,
  getTodayDate,
  isValidDate
} from '@/src/shared/lib'
import { MealList } from '@/src/widgets/(planner)/meal-list'
import { NutritionTable } from '@/src/widgets/(planner)/nutrition-table'

interface SearchParams {
  date: string
}

const page = async ({
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) => {
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

  const resolvedSearchParams = await searchParams
  const date = resolvedSearchParams?.date || null
  const today = getTodayDate()

  if (!date) {
    return redirect(`/planner?date=${today}`)
  }

  const userDate = extractDate(data.user.created_at)

  if (!isValidDate(date, userDate, today)) {
    return <NotFound href="/planner" />
  }

  const planner = await getPlannerByDate(user_id, date)

  if (planner) {
    return (
      <div className="min-h-[calc(100vh-185.5px)] flex flex-col md:flex-row gap-4 md:gap-8 justify-center overflow-auto">
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-8">
          <div className="">
            <DateSelector currentDate={date} userDate={userDate} />
            <Image
              className="select-none min-w-[150px] min-h-[150px]"
              src="/image_planner.png"
              height={250}
              width={250}
              alt="planner"
            />
          </div>
          <NutritionTable profile={profile} planner={planner} />
        </div>
        <MealList planner={planner} profile={profile} currentDate={date} />
      </div>
    )
  }

  const menu = await getMenu(user_id)

  if (!menu) {
    redirect('/login')
  }

  const caloriesPercentages = calculateMealCaloriesPercentages({
    breakfast: menu.breakfast,
    lunch: menu.lunch,
    dinner: menu.dinner,
    snack: menu.snack,
    dessert: menu.dessert
  })

  return (
    <div className="min-h-[calc(100vh-185.5px)] flex flex-col md:flex-row justify-center gap-4 md:gap-8 overflow-auto">
      <div className="flex flex-col items-center">
        <DateSelector currentDate={date} userDate={userDate} />
        <Image
          className="select-none min-w-[200px] min-h-[200px]"
          src="/image_planner.png"
          height={250}
          width={250}
          alt="planner"
        />
      </div>
      <div className="md:max-w-[600px] flex flex-col gap-4">
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold capitalize">
            What are we eating today?
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Set the menu of meals and generate a plan based on the menu. This
            feature allows you to organize your daily meals by selecting and
            arranging your preferred dishes for breakfast, lunch, dinner, and
            other meals.
          </p>
        </div>
        <GeneratePlanBtn
          profile={profile}
          caloriesPercentages={caloriesPercentages}
          currentDate={date}
        />
        <SetupMealsForm userId={user_id} menu={menu} />
      </div>
    </div>
  )
}

export default page

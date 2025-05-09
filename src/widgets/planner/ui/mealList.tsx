import { FC } from 'react'

import { Planner } from '@/src/entities/planner'
import { Profile } from '@/src/entities/profile'
import { DeletePlanBtn, RefreshPlanBtn } from '@/src/features/planner'

import { MealItem } from './mealItem'

interface MealListProps {
  planner: Planner
  profile: Profile
  currentDate: string
}

export const MealList: FC<MealListProps> = ({
  planner,
  profile,
  currentDate
}) => {
  return (
    <div className="flex flex-col gap-4">
      <section className="flex gap-4 justify-between">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold capitalize">
          Meals
        </h1>
        <div className="flex gap-2">
          <RefreshPlanBtn userId={profile.user_id} currentDate={currentDate} />
          <DeletePlanBtn userId={profile.user_id} currentDate={currentDate} />
        </div>
      </section>

      {planner.breakfast ? (
        <MealItem type="breakfast" recipe={planner.breakfast} />
      ) : null}
      {planner.lunch ? <MealItem type="lunch" recipe={planner.lunch} /> : null}
      {planner.dinner ? (
        <MealItem type="dinner" recipe={planner.dinner} />
      ) : null}
      {planner.snack ? <MealItem type="snack" recipe={planner.snack} /> : null}
      {planner.dessert ? (
        <MealItem type="dessert" recipe={planner.dessert} />
      ) : null}
    </div>
  )
}

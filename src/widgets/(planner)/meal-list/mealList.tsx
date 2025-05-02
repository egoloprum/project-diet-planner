import { FC } from 'react'

import { DeletePlanBtn } from '@/src/features/(planner)/delete-plan-btn'
import { RefreshPlanBtn } from '@/src/features/(planner)/refresh-plan-btn'
import { Profile } from '@/src/shared/model'

import { MealItem } from '../meal-item'

interface MealListProps {
  // planner: Planner
  profile: Profile
  currentDate: string
}

export const MealList: FC<MealListProps> = ({ profile, currentDate }) => {
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

      <MealItem type="breakfast" />
      <MealItem type="lunch" />
      <MealItem type="dinner" />
      <MealItem type="snack" />
      <MealItem type="dessert" />
    </div>
  )
}

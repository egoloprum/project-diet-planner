import { FC } from 'react'

import { Planner, Profile } from '@/src/shared/model'

interface NutritionTableProps {
  profile: Profile
  planner: Planner
}

export const NutritionTable: FC<NutritionTableProps> = ({
  profile,
  planner
}) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg sm:text-xl md:text-2xl font-bold capitalize">
        Nutrition
      </h1>
      <div className="flex gap-6 md:gap-12">
        <div className="flex flex-col gap-2 mr:4 sm:mr-8">
          <p className="text-sm md:text-base">.</p>
          <p className="text-sm md:text-base underline underline-offset-2 decoration-green-300 select-none">
            Calories
          </p>
          <p className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-yellow-400"></span>
            <span className="text-sm md:text-base underline underline-offset-2 decoration-green-300 select-none">
              Carbs
            </span>
          </p>
          <p className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
            <span className="text-sm md:text-base underline underline-offset-2 decoration-green-300 select-none">
              Fats
            </span>
          </p>
          <p className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-purple-400"></span>
            <span className="text-sm md:text-base underline underline-offset-2 decoration-green-300 select-none">
              Protein
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-2 text-end">
          <p className="text-sm md:text-base">Totals</p>
          <p className="text-sm md:text-base">{planner.calories}</p>
          <p className="text-sm md:text-base">{planner.carbs}g</p>
          <p className="text-sm md:text-base">{planner.fats}g</p>
          <p className="text-sm md:text-base">{planner.protein}g</p>
        </div>
        <div className="flex flex-col gap-2 text-end">
          <p className="text-sm md:text-base">Target</p>
          <p className="text-sm md:text-base">{profile.calories}</p>
          <p className="text-sm md:text-base">{profile.carbs}g</p>
          <p className="text-sm md:text-base">{profile.fats}g</p>
          <p className="text-sm md:text-base">{profile.protein}g</p>
        </div>
      </div>
    </div>
  )
}

import { FC } from 'react'

import { Profile } from '@/src/entities/profile'

interface NutritionCardProps {
  profile: Profile
}

export const NutritionCard: FC<NutritionCardProps> = ({ profile }) => {
  return (
    <section>
      <p>{profile.calories} Calories per day</p>
      <p className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-yellow-400"></span>
        <span className="flex gap-1">
          At least
          <small className="text-sm md:text-base underline underline-offset-2 decoration-green-300 select-none">
            {profile.carbs}g
          </small>
          Carbs
        </span>
      </p>
      <p className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
        <span className="flex gap-1">
          At least
          <small className="text-sm md:text-base underline underline-offset-2 decoration-green-300 select-none">
            {profile.fats}g
          </small>
          Fats
        </span>
      </p>
      <p className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-purple-400"></span>
        <span className="flex gap-1">
          At least
          <small className="text-sm md:text-base underline underline-offset-2 decoration-green-300 select-none">
            {profile.protein}g
          </small>
          Protein
        </span>
      </p>
    </section>
  )
}

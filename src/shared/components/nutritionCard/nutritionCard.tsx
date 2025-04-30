import { FC } from 'react'

import { Profile } from '../../model'

interface NutritionCardProps {
  profile: Profile
}

export const NutritionCard: FC<NutritionCardProps> = ({ profile }) => {
  return (
    <section>
      <p>{profile.calories} Calories per day</p>
      <p className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-yellow-400"></span>
        <span>At least {profile.carbs}g Carbs</span>
      </p>
      <p className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
        <span>At least {profile.fats}g Fats</span>
      </p>
      <p className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-purple-400"></span>
        <span>At least {profile.protein}g Protein</span>
      </p>
    </section>
  )
}

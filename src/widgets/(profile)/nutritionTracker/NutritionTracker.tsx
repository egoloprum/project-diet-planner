import { FC } from 'react'

import { Input } from '@/src/shared/ui/input'
import { Label } from '@/src/shared/ui/label'

interface NutritionTrackerProps {
  userId: string
}

export const NutritionTracker: FC<NutritionTrackerProps> = ({ userId }) => {
  return (
    <div className="min-w-[300px] flex flex-1 flex-col items-center gap-4">
      <h2 className="text-2xl">Nutrition Tracker</h2>

      <div className="flex flex-col gap-2 max-w-[250px] w-full">
        <div className="flex items-center justify-between gap-2">
          <Label>Calories</Label>
          <Input className="max-w-20 " />
        </div>
        <div className="flex items-center justify-between gap-2">
          <Label>Carbs</Label>
          <Input className="max-w-20 " />
        </div>
        <div className="flex items-center justify-between gap-2">
          <Label>Fats</Label>
          <Input className="max-w-20 " />
        </div>
        <div className="flex items-center justify-between gap-2">
          <Label>Protein</Label>
          <Input className="max-w-20 " />
        </div>
      </div>
    </div>
  )
}

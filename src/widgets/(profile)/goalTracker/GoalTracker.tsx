import { FC } from 'react'

import { Label } from '@/src/shared/ui/label'
import { RadioGroupItem, RadioGroup } from '@/src/shared/ui/radio-group'

interface GoalTrackerProps {
  userId: string
}

export const GoalTracker: FC<GoalTrackerProps> = ({ userId }) => {
  return (
    <div className="min-w-[300px] flex flex-1 flex-col items-center gap-4">
      <h2 className="text-2xl">Goal Tracker</h2>

      <div>
        <RadioGroup defaultValue="nothing">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="lose" id="r1" />
            <Label htmlFor="r1">Lose</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="maintain" id="r2" />
            <Label htmlFor="r2">Maintain</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="gain" id="r3" />
            <Label htmlFor="r3">Gain</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="nothing" id="r4" />
            <Label htmlFor="r4">Nothing</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}

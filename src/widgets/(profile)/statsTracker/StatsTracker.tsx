import { FC } from 'react'

import { Input } from '@/src/shared/ui/input'
import { Label } from '@/src/shared/ui/label'

interface StatsTrackerProps {
  userId: string
}

export const StatsTracker: FC<StatsTrackerProps> = ({ userId }) => {
  return (
    <div className="min-w-[300px] flex flex-1 flex-col items-center gap-4">
      <h2 className="text-2xl bold">Physical Stats Tracker</h2>

      <div className="flex flex-col gap-2 max-w-[250px] w-full">
        <div className="flex items-center justify-between gap-2">
          <Label>Age</Label>
          <Input className="max-w-20 " />
        </div>
        <div className="flex items-center justify-between gap-2">
          <Label>Height (metric)</Label>
          <Input className="max-w-20 " />
        </div>
        <div className="flex items-center justify-between gap-2">
          <Label>Gender</Label>
          <Input className="max-w-20 " />
        </div>
        <div className="flex items-center justify-between gap-2">
          <Label>Body Fat</Label>
          <Input className="max-w-20 " />
        </div>
        <div className="flex items-center justify-between gap-2">
          <Label>Activity Level</Label>
          <Input className="max-w-20 " />
        </div>
      </div>
    </div>
  )
}

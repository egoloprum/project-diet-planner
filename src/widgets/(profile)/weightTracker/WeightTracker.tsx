'use client'

import { User } from '@supabase/supabase-js'
import { FC, useState } from 'react'

import { Button } from '@/src/shared/ui/button'
// import { Calendar } from '@/src/shared/ui/calendar'
import { Input } from '@/src/shared/ui/input'
import { Label } from '@/src/shared/ui/label'

interface WeightTrackerProps {
  user: User
}

export const WeightTracker: FC<WeightTrackerProps> = ({ user }) => {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const minDate = new Date(user.created_at)
  const maxDate = new Date()

  const [isEditable, setIsEditable] = useState<boolean>(true)

  return (
    <div className="min-w-[300px] flex flex-1 flex-col items-center gap-4">
      <h2 className="text-2xl bold">Weight Tracker</h2>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex flex-col gap-4 max-w-[350px]">
          <div className="flex items-center gap-4">
            <Label>metric weight (kg)</Label>
            <Input
              className="text-end max-w-[50px]"
              placeholder="30"
              disabled={isEditable}
            />
            <Button
              variant="outline"
              onClick={() => setIsEditable(!isEditable)}>
              Edit weight
            </Button>
          </div>

          <div className="flex flex-col gap-2">
            {/* <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              fromDate={minDate}
              toDate={maxDate}
              className="rounded-md border"
            /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

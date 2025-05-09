'use client'

import { FC } from 'react'

import { DateNextBtn } from '@/src/features/planner/ui/dateNextBtn'
import { DatePreviousBtn } from '@/src/features/planner/ui/datePreviousBtn'
import { DateSelectorBtn } from '@/src/features/planner/ui/dateSelectorBtn'
import { humanizeDate } from '@/src/shared/lib'

interface DateSelectorProps {
  currentDate: string
  userDate: string
}

export const DateSelector: FC<DateSelectorProps> = ({
  currentDate,
  userDate
}) => {
  return (
    <div className="flex items-center gap-1 w-[350px]">
      <DatePreviousBtn currentDate={currentDate} userDate={userDate} />
      <DateSelectorBtn currentDate={currentDate} userDate={userDate} />
      <DateNextBtn currentDate={currentDate} />
      <p className="text-base md:text-lg underline underline-offset-2 decoration-green-300 text-nowrap">
        {humanizeDate(currentDate)}
      </p>
    </div>
  )
}

'use client'

import { FC } from 'react'

import { humanizeDate } from '@/src/shared/lib'

import { DateNextBtn } from '../date-next-btn'
import { DatePreviousBtn } from '../date-previous-btn'
import { DateSelectorBtn } from '../date-selector-btn'

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

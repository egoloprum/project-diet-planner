'use client'

import { Calendar1 } from 'lucide-react'
import { FC } from 'react'

import {
  Button,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/src/shared/ui'

interface DateSelectorBtnProps {
  currentDate: string
  userDate: string
}

export const DateSelectorBtn: FC<DateSelectorBtnProps> = ({
  currentDate,
  userDate
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="aspect-square rounded-full h-10 w-10">
          <Calendar1 className="w-6 h-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0" align="start">
        <Calendar
          mode="single"
          selected={new Date(currentDate)}
          // onSelect={field.onChange}
          disabled={date => date > new Date() || date < new Date(userDate)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

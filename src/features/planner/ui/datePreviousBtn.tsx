'use client'

import { ChevronLeft } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FC, useCallback } from 'react'

import { Button } from '@/src/shared/ui'

interface DatePreviousBtnProps {
  currentDate: string
  userDate: string
}

export const DatePreviousBtn: FC<DatePreviousBtnProps> = ({
  currentDate,
  userDate
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const handleClick = () => {
    const [year, month, day] = currentDate.split('-').map(Number)
    const date = new Date(year, month - 1, day)
    const previousDate = new Date(date.getTime() - 86400000)

    const formattedYear = previousDate.getFullYear()
    const formattedMonth = String(previousDate.getMonth() + 1)
    const formattedDay = String(previousDate.getDate())

    const newDate = `${formattedYear}-${formattedMonth}-${formattedDay}`

    router.push(pathname + '?' + createQueryString('date', newDate))
    router.refresh()
  }

  return (
    <Button
      onClick={handleClick}
      variant="ghost"
      className="aspect-square rounded-full h-10 w-10"
      disabled={currentDate === userDate}>
      <ChevronLeft className="w-6 h-6" />
    </Button>
  )
}

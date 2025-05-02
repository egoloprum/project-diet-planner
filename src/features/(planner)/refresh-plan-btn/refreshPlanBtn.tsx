'use client'

import { RefreshCw } from 'lucide-react'
import { FC } from 'react'

import { Button } from '@/src/shared/ui'

interface RefreshPlanBtnProps {
  userId: string
  currentDate: string
}

export const RefreshPlanBtn: FC<RefreshPlanBtnProps> = ({}) => {
  const handleClick = () => {
    console.log('clicked')
  }

  return (
    <Button
      onClick={handleClick}
      variant="ghost"
      className="aspect-square rounded-full h-10 w-10">
      <RefreshCw className="w-6 h-6" />
    </Button>
  )
}

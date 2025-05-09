'use client'

import axios from 'axios'
import { RefreshCw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'

import { Profile } from '@/src/entities/profile'
import { useToast } from '@/src/shared/hooks'
import { Button } from '@/src/shared/ui'

interface GeneratePlanBtnProps {
  profile: Profile
  caloriesPercentages: {
    name: string
    percentage: number
  }[]
  currentDate: string
}

export const GeneratePlanBtn: FC<GeneratePlanBtnProps> = ({
  profile,
  caloriesPercentages,
  currentDate
}) => {
  const { toast } = useToast()
  const router = useRouter()

  const [isLoading, setIsloading] = useState<boolean>(false)

  const handleClick = async () => {
    try {
      setIsloading(true)
      await axios.post('/api/planner/create', {
        date: currentDate,
        userId: profile.user_id,
        caloriesPercentages: caloriesPercentages,
        profileCalories: profile.calories,
        profileCarbs: profile.carbs,
        profileFats: profile.fats,
        profileProtein: profile.protein
      })

      toast({
        variant: 'default',
        title: 'Planner is successfully created!'
      })

      router.refresh()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          variant: 'destructive',
          title: error.response?.data?.error || 'Creating planner failed!'
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'An unexpected error occurred!'
        })
      }
    } finally {
      setIsloading(false)
    }
  }

  return (
    <Button
      variant="default"
      className="rounded-xl max-w-fit"
      onClick={handleClick}>
      <RefreshCw className={`w-4 h-4 ${isLoading && 'animate-spin'}`} />
      Generate
    </Button>
  )
}

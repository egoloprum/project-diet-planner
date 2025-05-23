'use client'

import axios from 'axios'
import {
  Cherry,
  Drumstick,
  LeafyGreen,
  Loader2,
  Sandwich,
  Vegan,
  Wheat
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC, ForwardRefExoticComponent, SVGProps, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Diet } from '@/src/entities/diet'
import { useToast } from '@/src/shared/hooks'
import {
  Button,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/src/shared/ui'

type DefaultDiet = {
  name: string
  exclusion: string
  icon: string
  excludeList: string[]
}

interface DietItemFormProps {
  defaultDiet: DefaultDiet
  selectedDiet: Diet
  user_id: string
}

type DietInput = {
  name: string
  list: string[]
}

export const DietItemForm: FC<DietItemFormProps> = ({
  defaultDiet,
  selectedDiet,
  user_id
}) => {
  const {
    handleSubmit,
    formState: {}
  } = useForm<DietInput>()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const { toast } = useToast()

  const onSubmit: SubmitHandler<DietInput> = async () => {
    try {
      setIsLoading(true)
      const name = defaultDiet.name
      const list = defaultDiet.excludeList

      await axios.post('/api/diet/update', {
        user_id,
        name,
        list
      })

      toast({
        variant: 'default',
        title: 'Diet is updated successfully!'
      })

      router.refresh()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          variant: 'destructive',
          title: error.response?.data?.error || 'Update failed!'
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'An unexpected error occurred!'
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  type IconMap = {
    [key: string]: ForwardRefExoticComponent<SVGProps<SVGSVGElement>>
  }

  const iconMap: IconMap = {
    Sandwich: Sandwich,
    Wheat: Wheat,
    Cherry: Cherry,
    Drumstick: Drumstick,
    Vegan: Vegan,
    LeafyGreen: LeafyGreen
  }

  const IconComponent = iconMap[defaultDiet.icon]

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)} className="h-full">
      <HoverCard>
        <HoverCardTrigger>
          <Button
            type="submit"
            variant="secondary"
            className={`p-4 w-full h-full justify-start rounded-xl hover:bg-gray-100 active:bg-purple-100 
            ${selectedDiet.diet_type === defaultDiet.name && 'bg-purple-100'}`}>
            {isLoading ? (
              <Loader2 className="animate-spin sm:min-w-10 sm:min-h-10 min-w-8 min-h-8" />
            ) : (
              <IconComponent className="sm:min-w-10 sm:min-h-10 min-w-8 min-h-8" />
            )}
            <p className="text-sm lg:text-base">{defaultDiet.name}</p>
          </Button>
        </HoverCardTrigger>
        <HoverCardContent>Excludes: {defaultDiet.exclusion}</HoverCardContent>
      </HoverCard>
    </form>
  )
}

'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Profile } from '@/src/entities/profile'
import { useToast } from '@/src/shared/hooks'
import {
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/src/shared/ui'

interface ActivityLevelFormProps {
  profile: Profile
  weight: number
}

type ActivityLevelFormData = {
  activityLevel: number
}

const ActivityLevel = [
  'Desk job, light exercise',
  'Lightly active, workout 3-4 times/week',
  'Active daily, frequent exercise',
  'Very athletic',
  'Extremely athletic'
]

export const ActivityLevelForm: FC<ActivityLevelFormProps> = ({
  profile,
  weight
}) => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors }
  } = useForm<ActivityLevelFormData>({
    resolver: zodResolver(
      z.object({
        activityLevel: z.number()
      })
    ),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      activityLevel: profile.activity_level
    }
  })

  const router = useRouter()
  const { toast } = useToast()

  const onSubmit: SubmitHandler<ActivityLevelFormData> = async data => {
    if (!data) {
      return
    }

    try {
      await axios.patch('/api/profile/set-activity-level', {
        ...data,
        userId: profile.user_id
      })

      await axios.patch('/api/profile/set-nutritions', {
        ...data,
        userId: profile.user_id,
        height: profile.height,
        weight: weight,
        age: profile.age,
        gender: profile.gender,
        goal: profile.goal
      })

      toast({
        variant: 'default',
        title: 'Activity level is successfully changed!'
      })

      router.refresh()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          variant: 'destructive',
          title:
            error.response?.data?.error || 'Changing activity level failed!'
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'An unexpected error occurred!'
        })
      }
    }
  }

  const handleBlur = () => {
    handleSubmit(onSubmit)()
  }

  return (
    <form className="text-sm sm:text-base">
      <div className="flex flex-wrap items-center gap-4 justify-between">
        <Label
          id="activity-level"
          className="text-sm md:text-base underline underline-offset-2 decoration-green-300 select-none">
          Activity Level
        </Label>

        <Select
          {...register('activityLevel', { required: true })}
          onValueChange={value => {
            setValue('activityLevel', Number(value))
            handleBlur()
          }}>
          <SelectTrigger className="max-w-[350px] w-full rounded-xl">
            <SelectValue
              placeholder={
                ActivityLevel[profile.activity_level - 1] ||
                'Select an activity level'
              }
            />
          </SelectTrigger>
          <SelectContent className="w-fit z-10 left-[70%] translate-x-[-70%] sm:translate-x-[-45%]">
            <SelectItem value="1">Desk job, light exercise</SelectItem>
            <SelectItem value="2">
              Lightly active, workout 3-4 times/week
            </SelectItem>
            <SelectItem defaultChecked value="3">
              Active daily, frequent exercise
            </SelectItem>
            <SelectItem value="4">Very athletic</SelectItem>
            <SelectItem value="5">Extremely athletic</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {errors.activityLevel && (
        <span className="text-red-500">{errors.activityLevel.message}</span>
      )}
    </form>
  )
}

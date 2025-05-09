'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Profile } from '@/src/entities/profile'
import { useToast } from '@/src/shared/hooks'
import { getTodayDate } from '@/src/shared/lib'
import { Input, Label } from '@/src/shared/ui'

interface WeightFormProps {
  profile: Profile
  weight: number
}

type WeightFormData = {
  weight: number
}

export const WeightForm: FC<WeightFormProps> = ({ profile, weight }) => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<WeightFormData>({
    resolver: zodResolver(
      z.object({
        weight: z
          .number()
          .min(30, { message: 'Weight must be at least 30 kg.' })
          .max(500, { message: 'Weight must not exceed 500 kg.' })
      })
    ),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      weight: weight
    }
  })

  const [currentWeight, setCurrentWeight] = useState<number>(weight)

  const router = useRouter()
  const { toast } = useToast()

  const onSubmit: SubmitHandler<WeightFormData> = async data => {
    if (!data) {
      return
    }

    const today = getTodayDate()

    try {
      await axios.patch('/api/weight/update', {
        ...data,
        userId: profile.user_id,
        date: today
      })

      toast({
        variant: 'default',
        title: 'Weight is successfully changed!'
      })

      await axios.patch('/api/profile/set-nutritions', {
        ...data,
        userId: profile.user_id,
        gender: profile.gender,
        height: profile.height,
        age: profile.age,
        activityLevel: profile.activity_level,
        goal: profile.goal
      })

      router.refresh()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          variant: 'destructive',
          title: error.response?.data?.error || 'Changing weight failed!'
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
    if (currentWeight !== weight) {
      handleSubmit(onSubmit)()
    }
  }

  return (
    <form
      className="text-sm sm:text-base border-b-2 pb-4"
      onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center gap-2 justify-between">
        <Label
          htmlFor="weight"
          className="text-sm md:text-base underline underline-offset-2 decoration-green-300 select-none">
          Weight
        </Label>
        <div className="flex items-center gap-2">
          <Input
            id="weight"
            type="number"
            className="w-20 rounded-xl"
            {...register('weight', {
              valueAsNumber: true,
              validate: value => value > 0 || 'Must be positive number',
              onChange: e => setCurrentWeight(Number(e.target.value))
            })}
            onBlur={handleBlur}
          />
          <span>kgs</span>
        </div>
      </div>
      {errors.weight && (
        <span className="text-red-500">{errors.weight.message}</span>
      )}
    </form>
  )
}

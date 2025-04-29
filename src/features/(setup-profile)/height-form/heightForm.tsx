'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useToast } from '@/src/shared/hooks'
import { Profile } from '@/src/shared/model'
import { Input, Label } from '@/src/shared/ui'

interface HeightFormProps {
  profile: Profile
  weight: number
}

type HeightFormData = {
  height: number
}

export const HeightForm: FC<HeightFormProps> = ({ profile, weight }) => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<HeightFormData>({
    resolver: zodResolver(
      z.object({
        height: z
          .number()
          .min(50, { message: 'Height must be at least 50 cm.' })
          .max(240, { message: 'Height must not exceed 240 cm.' })
      })
    ),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      height: profile.height
    }
  })

  const [currentHeight, setCurrentHeight] = useState<number>(profile.height)

  const router = useRouter()
  const { toast } = useToast()

  const onSubmit: SubmitHandler<HeightFormData> = async data => {
    if (!data) {
      return
    }

    try {
      await axios.patch('/api/profile/set-height', {
        ...data,
        userId: profile.user_id
      })

      toast({
        variant: 'default',
        title: 'Height is successfully changed!'
      })

      await axios.patch('/api/profile/set-nutritions', {
        ...data,
        userId: profile.user_id,
        gender: profile.gender,
        weight: weight,
        age: profile.age,
        activityLevel: profile.activity_level,
        goal: profile.goal
      })

      router.refresh()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          variant: 'destructive',
          title: error.response?.data?.error || 'Changing height failed!'
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
    if (currentHeight !== profile.height) {
      handleSubmit(onSubmit)()
    }
  }

  return (
    <form
      className="text-sm sm:text-base border-b-2 pb-4"
      onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center gap-2 justify-between">
        <Label htmlFor="height" className="font-bold">
          Height
        </Label>
        <div className="flex items-center gap-2">
          <Input
            id="height"
            type="number"
            className="w-20"
            {...register('height', {
              valueAsNumber: true,
              validate: value => value > 0 || 'Must be positive number',
              onChange: e => setCurrentHeight(Number(e.target.value))
            })}
            onBlur={handleBlur}
          />
          <span className="">cm</span>
        </div>
      </div>
      {errors.height && (
        <span className="text-red-500">{errors.height.message}</span>
      )}
    </form>
  )
}

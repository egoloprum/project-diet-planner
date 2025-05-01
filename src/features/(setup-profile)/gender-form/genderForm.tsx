'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useToast } from '@/src/shared/hooks'
import { Profile } from '@/src/shared/model'
import { Button, Label } from '@/src/shared/ui'

interface GenderFormProps {
  profile: Profile
  weight: number
}

type GenderFormData = {
  gender: 'male' | 'female'
}

export const GenderForm: FC<GenderFormProps> = ({ profile, weight }) => {
  const {
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<GenderFormData>({
    resolver: zodResolver(
      z.object({
        gender: z.enum(['male', 'female'])
      })
    ),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      gender: profile.gender
    }
  })

  const router = useRouter()
  const { toast } = useToast()

  const onSubmit: SubmitHandler<GenderFormData> = async data => {
    if (!data) {
      return
    }

    try {
      await axios.patch('/api/profile/set-gender', {
        ...data,
        userId: profile.user_id
      })

      toast({
        variant: 'default',
        title: 'Gender is successfully changed!'
      })

      await axios.patch('/api/profile/set-nutritions', {
        ...data,
        userId: profile.user_id,
        height: profile.height,
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
          title: error.response?.data?.error || 'Changing gender failed!'
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'An unexpected error occurred!'
        })
      }
    }
  }

  return (
    <form className="text-sm sm:text-base border-b-2 pb-4">
      <div className="flex items-center gap-2 justify-between">
        <Label
          id="gender"
          className="text-sm md:text-base underline underline-offset-2 decoration-green-300 select-none">
          Gender
        </Label>
        <div className="flex items-center">
          <Button
            variant={profile.gender === 'male' ? 'secondary' : 'outline'}
            className="rounded-s-xl"
            type="button"
            onClick={() => {
              setValue('gender', 'male')
              handleSubmit(onSubmit)()
            }}>
            Male
          </Button>
          <Button
            variant={profile.gender === 'female' ? 'secondary' : 'outline'}
            className="rounded-e-xl"
            type="button"
            onClick={() => {
              setValue('gender', 'female')
              handleSubmit(onSubmit)()
            }}>
            Female
          </Button>
        </div>
      </div>
      {errors.gender && (
        <span className="text-red-500">{errors.gender.message}</span>
      )}
    </form>
  )
}

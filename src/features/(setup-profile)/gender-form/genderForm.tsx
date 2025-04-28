'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useToast } from '@/src/shared/hooks'
import { Button, Label } from '@/src/shared/ui'

interface GenderFormProps {
  userId: string
  gender: 'male' | 'female'
}

type GenderFormData = {
  gender: 'male' | 'female'
}

export const GenderForm: FC<GenderFormProps> = ({ userId, gender }) => {
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
      gender: gender
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
        userId: userId
      })

      toast({
        variant: 'default',
        title: 'Gender is successfully changed!'
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
        <Label id="gender" className="font-bold">
          Gender
        </Label>
        <div className="flex items-center">
          <Button
            variant={gender === 'male' ? 'secondary' : 'outline'}
            className="rounded-s-xl"
            type="button"
            onClick={() => {
              setValue('gender', 'male')
              handleSubmit(onSubmit)()
            }}>
            Male
          </Button>
          <Button
            variant={gender === 'female' ? 'secondary' : 'outline'}
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

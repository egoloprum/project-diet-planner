'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useToast } from '@/src/shared/hooks'
import { Input, Label } from '@/src/shared/ui'

interface AgeFormProps {
  userId: string
  age: number
}

type AgeFormData = {
  age: number
}

export const AgeForm: FC<AgeFormProps> = ({ userId, age }) => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<AgeFormData>({
    resolver: zodResolver(
      z.object({
        age: z
          .number()
          .min(18, { message: 'Age must be at least 18 years.' })
          .max(100, { message: 'Age must not exceed 100 years.' })
      })
    ),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      age: age
    }
  })

  const [currentAge, setCurrentAge] = useState<number>(age)

  const router = useRouter()
  const { toast } = useToast()

  const onSubmit: SubmitHandler<AgeFormData> = async data => {
    if (!data) {
      return
    }

    try {
      await axios.patch('/api/profile/set-age', {
        ...data,
        userId: userId
      })

      toast({
        variant: 'default',
        title: 'Age is successfully changed!'
      })

      router.refresh()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          variant: 'destructive',
          title: error.response?.data?.error || 'Changing age failed!'
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
    if (currentAge !== age) {
      handleSubmit(onSubmit)()
    }
  }

  return (
    <form
      className="text-sm sm:text-base border-b-2 pb-4"
      onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center gap-2 justify-between">
        <Label htmlFor="age" className="font-bold">
          Age
        </Label>
        <div className="flex items-center gap-2">
          <Input
            id="age"
            type="number"
            className="w-20"
            {...register('age', {
              valueAsNumber: true,
              validate: value => value > 0 || 'Must be positive number',
              onChange: e => setCurrentAge(Number(e.target.value))
            })}
            onBlur={handleBlur}
          />
          <span>years</span>
        </div>
      </div>
      {errors.age && <span className="text-red-500">{errors.age.message}</span>}
    </form>
  )
}

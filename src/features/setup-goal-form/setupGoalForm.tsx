'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useToast } from '@/src/shared/hooks'
import { Button, Label } from '@/src/shared/ui'

interface SetupGoalFormProps {
  userId: string
  goal: 'Lose fat' | 'Maintain weight' | 'Build muscle'
}

type SetupGoalData = {
  goal: 'Lose fat' | 'Maintain weight' | 'Build muscle'
}

export const SetupGoalForm: FC<SetupGoalFormProps> = ({ userId, goal }) => {
  const {
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<SetupGoalData>({
    resolver: zodResolver(
      z.object({
        goal: z.enum(['Lose fat', 'Maintain weight', 'Build muscle'])
      })
    ),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      goal: goal
    }
  })

  const router = useRouter()
  const { toast } = useToast()

  const onSubmit: SubmitHandler<SetupGoalData> = async data => {
    if (!data) {
      return
    }

    try {
      await axios.patch('/api/profile/set-goal', {
        ...data,
        userId: userId
      })

      toast({
        variant: 'default',
        title: 'Goal is successfully changed!'
      })

      router.refresh()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          variant: 'destructive',
          title: error.response?.data?.error || 'Changing goal failed'
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'An unexpected error occurred'
        })
      }
    }
  }

  return (
    <form className="text-sm sm:text-base">
      <div className="flex flex-wrap items-center gap-2 justify-between">
        <Label id="goal" className="font-bold">
          Set a goal
        </Label>

        <div className="flex items-center">
          <Button
            variant={goal === 'Lose fat' ? 'secondary' : 'outline'}
            className="rounded-s-xl"
            type="button"
            onClick={() => {
              setValue('goal', 'Lose fat')
              handleSubmit(onSubmit)()
            }}>
            Lose fat
          </Button>
          <Button
            variant={goal === 'Maintain weight' ? 'secondary' : 'outline'}
            className=""
            type="button"
            onClick={() => {
              setValue('goal', 'Maintain weight')
              handleSubmit(onSubmit)()
            }}>
            Maintain weight
          </Button>
          <Button
            variant={goal === 'Build muscle' ? 'secondary' : 'outline'}
            className="rounded-e-xl"
            type="button"
            onClick={() => {
              setValue('goal', 'Build muscle')
              handleSubmit(onSubmit)()
            }}>
            Build muscle
          </Button>
        </div>
      </div>
      {errors.goal && (
        <span className="text-red-500">{errors.goal.message}</span>
      )}
    </form>
  )
}

'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Profile } from '@/src/entities/profile'
import { useToast } from '@/src/shared/hooks'
import { Input, Label } from '@/src/shared/ui'

interface UsernameFormProps {
  profile: Profile
}

type UsernameFormData = {
  username: string
}

export const UsernameForm: FC<UsernameFormProps> = ({ profile }) => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<UsernameFormData>({
    resolver: zodResolver(
      z.object({
        username: z
          .string()
          .min(3, { message: 'Username must be at least 3 characters long' })
          .max(20, { message: 'Username must be at most 20 characters long' })
          .regex(/^[a-zA-Z0-9_]+$/, {
            message:
              'Username can only contain letters, numbers, and underscores'
          })
      })
    ),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      username: profile.user_name
    }
  })

  const [currentUsername, setCurrentUsername] = useState<string>(
    profile.user_name
  )

  const router = useRouter()
  const { toast } = useToast()

  const onSubmit: SubmitHandler<UsernameFormData> = async data => {
    if (!data) {
      return
    }

    try {
      await axios.patch('/api/profile/set-username', {
        ...data,
        userId: profile.user_id
      })

      toast({
        variant: 'default',
        title: 'Username is successfully changed!'
      })

      router.refresh()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          variant: 'destructive',
          title: error.response?.data?.error || 'Changing username failed!'
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
    if (currentUsername !== profile.user_name) {
      handleSubmit(onSubmit)()
    }
  }

  return (
    <form
      className="text-sm sm:text-base border-b-2 pb-4"
      onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center gap-4 justify-between">
        <Label
          htmlFor="username"
          className="text-sm md:text-base underline underline-offset-2 decoration-green-300 select-none">
          Username
        </Label>
        <Input
          id="username"
          className="w-50 rounded-xl"
          {...register('username', {
            onChange: e => setCurrentUsername(e.target.value)
          })}
          onBlur={handleBlur}
        />
      </div>
      {errors.username && (
        <span className="text-red-500">{errors.username.message}</span>
      )}
    </form>
  )
}

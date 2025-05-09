'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useToast } from '@/src/shared/hooks'
import { Input, Label } from '@/src/shared/ui'

interface EmailFormProps {
  email: string
}

type EmailFormData = {
  email: string
}

export const EmailForm: FC<EmailFormProps> = ({ email }) => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<EmailFormData>({
    resolver: zodResolver(
      z.object({
        email: z
          .string()
          .min(3, { message: 'Email must be at least 3 characters long' })
          .max(50, { message: 'Email must be at most 50 characters long' })
          .email({ message: 'Invalid email address' })
      })
    ),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      email: email
    }
  })

  const [currentEmail, setCurrentEmail] = useState<string>(email)

  const router = useRouter()
  const { toast } = useToast()

  const onSubmit: SubmitHandler<EmailFormData> = async data => {
    if (!data) {
      return
    }

    try {
      await axios.patch('/api/profile/set-email', {
        ...data
      })

      toast({
        variant: 'default',
        title: 'Email is successfully changed!'
      })

      router.refresh()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          variant: 'destructive',
          title: error.response?.data?.error || 'Changing email failed!'
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
    if (currentEmail !== email) {
      handleSubmit(onSubmit)()
    }
  }

  return (
    <form className="text-sm sm:text-base" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center gap-4 justify-between">
        <Label
          htmlFor="email"
          className="text-sm md:text-base underline underline-offset-2 decoration-green-300 select-none">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          className="w-50 rounded-xl"
          {...(register('email'),
          {
            defaultValue: currentEmail,
            onChange: e => setCurrentEmail(e.target.value)
          })}
          onBlur={handleBlur}
        />
      </div>
      {errors.email && (
        <span className="text-red-500">{errors.email.message}</span>
      )}
    </form>
  )
}

'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@supabase/supabase-js'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FC, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useToast } from '@/src/shared/hooks'
import { Profile } from '@/src/shared/model'
import { Button } from '@/src/shared/ui/button'
import { Input } from '@/src/shared/ui/input'
import { Label } from '@/src/shared/ui/label'
import { Separator } from '@/src/shared/ui/separator'

import { ProfileValidator } from './lib/profileValidator'

interface ProfileEditFormProps {
  user: User
  profile: Profile
}

type RecipeEditModalData = {
  email: string
  username: string
  password: string
}

export const ProfileEditForm: FC<ProfileEditFormProps> = ({
  user,
  profile
}) => {
  const [isEditable, setIsEditable] = useState<boolean>(true)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RecipeEditModalData>({
    resolver: zodResolver(ProfileValidator),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {}
  })

  const router = useRouter()
  const { toast } = useToast()

  const onSubmit: SubmitHandler<RecipeEditModalData> = async data => {
    try {
      await axios.patch('/api/profile-settings/update', {
        ...data,
        userId: user.id
      })

      toast({
        variant: 'default',
        title: 'Recipe is edited successfully!'
      })
      setIsEditable(true)

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
    }
  }

  const onClick = () => {
    if (isEditable) {
      setIsEditable(false)
    } else {
      if (formRef.current) {
        formRef.current.requestSubmit()
      }
    }
  }

  const formRef = useRef<HTMLFormElement>(null)

  return (
    <div>
      <h1 className="bold text-2xl">Profile Settings</h1>
      <Separator className="my-4" />

      <div className="flex flex-1 flex-wrap justify-between items-center gap-4">
        <h2 className="text-xl">Profile</h2>
        <div className="flex items-center gap-4">
          <div className="relative h-10 w-10">
            <Image
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded-full"
              src={profile.avatar_url}
              alt="profile pic"
            />
          </div>
          <p>Username</p>
        </div>
        <Button
          variant={isEditable ? 'secondary' : 'default'}
          type="submit"
          onClick={onClick}
          className="max-w-[150px] w-full">
          {isEditable ? 'Edit profile' : 'Save profile'}
        </Button>
      </div>

      <Separator className="my-4" />

      <form
        className="flex flex-wrap gap-4"
        onSubmit={handleSubmit(onSubmit)}
        ref={formRef}>
        <fieldset className="flex gap-4 justify-between sm:justify-normal items-center max-w-[300px] w-full">
          <Label className="text-nowrap">Email address</Label>
          <Input
            className="max-w-[200px] w-full"
            type="email"
            disabled={isEditable}
            placeholder="Email"
            defaultValue={user.email}
            {...register('email')}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </fieldset>
        <fieldset className="flex gap-4 justify-between sm:justify-normal items-center max-w-[300px] w-full">
          <Label className="">Username</Label>
          <Input
            className="max-w-[200px] w-full"
            type="text"
            placeholder="Username"
            disabled={isEditable}
            defaultValue={profile.user_name}
            {...register('username')}
          />
          {errors.username && (
            <span className="text-red-500 text-sm">
              {errors.username.message}
            </span>
          )}
        </fieldset>
        <fieldset className="flex gap-4 justify-between sm:justify-normal items-center max-w-[300px] w-full">
          <Label className="">Password</Label>
          <Input
            className="max-w-[200px] w-full"
            type="password"
            placeholder="Password"
            disabled={isEditable}
            {...register('password')}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </fieldset>
      </form>
    </div>
  )
}

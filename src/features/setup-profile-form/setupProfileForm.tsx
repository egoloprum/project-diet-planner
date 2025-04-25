'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator
} from '@/src/shared/ui'

import { ActivityLevel } from './lib/types'
import { setupProfileValidator } from './lib/validations'

interface SetupProfileFormProps {
  userId: string
}

type SetupProfileData = {
  gender: 'male' | 'female'
  height: number
  weight: number
  age: number
  activity_level: number
}

export const SetupProfileForm: FC<SetupProfileFormProps> = ({ userId }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<SetupProfileData>({
    resolver: zodResolver(setupProfileValidator),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      gender: 'male',
      height: 50,
      weight: 30,
      age: 18,
      activity_level: 3
    }
  })

  const activity_level = watch('activity_level')
  const gender = watch('gender')

  const onSubmit: SubmitHandler<SetupProfileData> = async data => {
    if (!data) {
      return
    }

    console.log('data', data, userId)
  }

  const handleBlur = () => {
    handleSubmit(onSubmit)()
  }

  return (
    <form>
      <div className="text-sm sm:text-base">
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
                handleBlur()
              }}>
              Male
            </Button>
            <Button
              variant={gender === 'female' ? 'secondary' : 'outline'}
              className="rounded-e-xl"
              type="button"
              onClick={() => {
                setValue('gender', 'female')
                handleBlur()
              }}>
              Female
            </Button>
          </div>
        </div>
        {errors.gender && (
          <span className="text-red-500">{errors.gender.message}</span>
        )}
      </div>
      <Separator className="my-4" />

      <div className="text-sm sm:text-base">
        <div className="flex items-center gap-2 justify-between">
          <Label id="height" className="font-bold">
            Height
          </Label>
          <div className="flex items-center gap-2">
            <Input
              id="height"
              type="number"
              className="w-20"
              {...register('height', {
                valueAsNumber: true,
                validate: value => value > 0 || 'Must be positive number'
              })}
              onBlur={handleBlur}
            />
            <span className="">cm</span>
          </div>
        </div>
        {errors.height && (
          <span className="text-red-500">{errors.height.message}</span>
        )}
      </div>
      <Separator className="my-4" />

      <div className="text-sm sm:text-base">
        <div className="flex items-center gap-2 justify-between">
          <Label id="weight" className="font-bold">
            Weight
          </Label>
          <div className="flex items-center gap-2">
            <Input
              id="weight"
              type="number"
              className="w-20"
              {...register('weight', {
                valueAsNumber: true,
                validate: value => value > 0 || 'Must be positive number'
              })}
              onBlur={handleBlur}
            />
            <span>kgs</span>
          </div>
        </div>
        {errors.weight && (
          <span className="text-red-500">{errors.weight.message}</span>
        )}
      </div>
      <Separator className="my-4" />

      <div className="text-sm sm:text-base">
        <div className="flex items-center gap-2 justify-between">
          <Label id="age" className="font-bold">
            Age
          </Label>
          <div className="flex items-center gap-2">
            <Input
              id="age"
              type="number"
              className="w-20"
              {...register('age', {
                valueAsNumber: true,
                validate: value => value > 0 || 'Must be positive number'
              })}
              onBlur={handleBlur}
            />
            <span>years</span>
          </div>
        </div>
        {errors.age && (
          <span className="text-red-500">{errors.age.message}</span>
        )}
      </div>
      <Separator className="my-4" />

      <div className="text-sm sm:text-base">
        <div className="flex flex-wrap items-center gap-2 justify-between">
          <Label id="activity-level" className="font-bold">
            Activity Level
          </Label>

          <Select
            {...register('activity_level', { required: true })}
            onValueChange={value => {
              setValue('activity_level', Number(value))
              handleBlur()
            }}>
            <SelectTrigger className="max-w-[350px] w-full">
              <SelectValue
                placeholder={
                  ActivityLevel[activity_level - 1] ||
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
        {errors.activity_level && (
          <span className="text-red-500">{errors.activity_level.message}</span>
        )}
      </div>
      <Separator className="my-4" />
    </form>
  )
}

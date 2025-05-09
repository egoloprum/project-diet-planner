'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { Menu } from '@/src/entities/menu'
import { useToast } from '@/src/shared/hooks'
import { Label, Separator, Switch } from '@/src/shared/ui'

interface SetupMealsFormProps {
  userId: string
  menu: Menu
  isStatic?: boolean
}

export const SetupMealsForm: FC<SetupMealsFormProps> = ({
  userId,
  menu,
  isStatic
}) => {
  const { handleSubmit, control } = useForm<Omit<Menu, 'id' | 'user_id'>>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      breakfast: menu.breakfast,
      lunch: menu.lunch,
      dinner: menu.dinner,
      snack: menu.snack,
      dessert: menu.dessert
    }
  })

  const router = useRouter()
  const { toast } = useToast()

  const onSubmit: SubmitHandler<Omit<Menu, 'id' | 'user_id'>> = async data => {
    if (!data) {
      return
    }

    const mealCount = Object.values(data).filter(value => value === true).length

    if (mealCount < 3) {
      toast({
        variant: 'destructive',
        title: 'Please select at least 3 meals.'
      })
      return
    }

    try {
      await axios.patch('/api/menu/update', {
        data,
        userId: userId
      })

      toast({
        variant: 'default',
        title: 'Menu is successfully changed!'
      })

      router.refresh()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          variant: 'destructive',
          title: error.response?.data?.error || 'Changing menu failed!'
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="py-4 flex items-center gap-4 justify-between">
        <Label
          className="text-sm md:text-base underline underline-offset-2 decoration-green-300 select-none"
          htmlFor="breakfast">
          Breakfast
        </Label>
        <Controller
          control={control}
          name="breakfast"
          render={({ field }) => (
            <Switch
              id="breakfast"
              checked={field.value}
              onCheckedChange={checked => {
                field.onChange(checked)
                handleSubmit(onSubmit)()
              }}
              disabled={isStatic}
            />
          )}
        />
      </div>
      <Separator />
      <div className="py-4 flex items-center gap-4 justify-between">
        <Label
          className="text-sm md:text-base underline underline-offset-2 decoration-green-300 select-none"
          htmlFor="lunch">
          Lunch
        </Label>
        <Controller
          control={control}
          name="lunch"
          render={({ field }) => (
            <Switch
              id="lunch"
              checked={field.value}
              onCheckedChange={checked => {
                field.onChange(checked)
                handleSubmit(onSubmit)()
              }}
              disabled={isStatic}
            />
          )}
        />
      </div>
      <Separator />
      <div className="py-4 flex items-center gap-4 justify-between">
        <Label
          className="text-sm md:text-base underline underline-offset-2 decoration-green-300 select-none"
          htmlFor="dinner">
          Dinner
        </Label>
        <Controller
          control={control}
          name="dinner"
          render={({ field }) => (
            <Switch
              id="dinner"
              checked={field.value}
              onCheckedChange={checked => {
                field.onChange(checked)
                handleSubmit(onSubmit)()
              }}
              disabled={isStatic}
            />
          )}
        />
      </div>
      <Separator />
      <div className="py-4 flex items-center gap-4 justify-between">
        <Label
          className="text-sm md:text-base underline underline-offset-2 decoration-green-300 select-none"
          htmlFor="snack">
          Snack
        </Label>
        <Controller
          control={control}
          name="snack"
          render={({ field }) => (
            <Switch
              id="snack"
              checked={field.value}
              onCheckedChange={checked => {
                field.onChange(checked)
                handleSubmit(onSubmit)()
              }}
              disabled={isStatic}
            />
          )}
        />
      </div>
      <Separator />
      <div className="py-4 flex items-center gap-4 justify-between">
        <Label
          className="text-sm md:text-base underline underline-offset-2 decoration-green-300 select-none"
          htmlFor="dessert">
          Dessert
        </Label>
        <Controller
          control={control}
          name="dessert"
          render={({ field }) => (
            <Switch
              id="dessert"
              checked={field.value}
              onCheckedChange={checked => {
                field.onChange(checked)
                handleSubmit(onSubmit)()
              }}
              disabled={isStatic}
            />
          )}
        />
      </div>

      <p className="text-gray-500 text-sm sm:text-base">
        {isStatic
          ? 'You can choose meals at planner page.'
          : 'There should be at least 3 combinations of meals.'}
      </p>
    </form>
  )
}

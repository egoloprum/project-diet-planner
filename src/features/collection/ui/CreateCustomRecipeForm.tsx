'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { useToast } from '@/src/shared/hooks'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/src/shared/ui'
import {
  Button,
  Input,
  Label,
  Separator,
  Textarea,
  ToggleGroup,
  ToggleGroupItem
} from '@/src/shared/ui'
import { RecipeValidator } from '@/src/shared/validations'

interface CreateCustomRecipeFormProps {
  userId: string
}

type CreateCustomRecipeData = {
  foodName: string
  prepTime: number
  cookTime: number

  tagCloud: string[]

  calories: number
  carbs: number
  fats: number
  protein: number

  direction: string
}

export const CreateCustomRecipeForm: FC<CreateCustomRecipeFormProps> = ({
  userId
}) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<CreateCustomRecipeData>({
    resolver: zodResolver(RecipeValidator),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      tagCloud: []
    }
  })

  const router = useRouter()
  const { toast } = useToast()

  const onSubmit: SubmitHandler<CreateCustomRecipeData> = async data => {
    try {
      await axios.post('/api/custom-recipe/create', {
        ...data,
        userId: userId
      })

      toast({
        variant: 'default',
        title: 'Recipe is successfuly created!'
      })

      router.refresh()
      reset()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          variant: 'destructive',
          title: error.response?.data?.error || 'Creating recipe failed!'
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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="rounded-xl">
          Create custom recipe
        </Button>
      </AlertDialogTrigger>
      <Separator className="my-4" />
      <AlertDialogContent className="max-h-[80%] overflow-y-auto">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <AlertDialogHeader>
            <AlertDialogTitle>Create Custom Recipe</AlertDialogTitle>
            <AlertDialogDescription>
              User can create any recipe they want.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex flex-col gap-4">
            <div>
              <Label
                htmlFor="food-name"
                className={`${errors.foodName && 'text-red-500'}`}>
                Food Name
              </Label>
              <Input
                type="text"
                id="food-name"
                className="rounded-xl"
                {...register('foodName')}
              />
              {errors.foodName && (
                <span className="text-red-500 text-sm">
                  {errors.foodName.message}
                </span>
              )}
            </div>
            <Separator />

            <fieldset className="flex gap-4 justify-between">
              <div className="w-full basis-1/2">
                <Label
                  htmlFor="prep-time"
                  className={`${errors.prepTime && 'text-red-500'}`}>
                  Preperation Time
                </Label>
                <Input
                  type="text"
                  id="prep-time"
                  className="rounded-xl"
                  defaultValue="0"
                  {...register('prepTime')}
                />
                {errors.prepTime && (
                  <span className="text-red-500 text-sm">
                    {errors.prepTime.message}
                  </span>
                )}
              </div>
              <div className="w-full basis-1/2">
                <Label
                  htmlFor="cook-time"
                  className={`${errors.cookTime && 'text-red-500'}`}>
                  Cook Time
                </Label>
                <Input
                  type="text"
                  id="cook-time"
                  className="rounded-xl"
                  defaultValue="0"
                  {...register('cookTime')}
                />
                {errors.cookTime && (
                  <span className="text-red-500 text-sm">
                    {errors.cookTime.message}
                  </span>
                )}
              </div>
            </fieldset>
            <Separator />

            <fieldset>
              <Label className={`${errors.tagCloud && 'text-red-500'}`}>
                Tags
              </Label>
              {errors.tagCloud && (
                <span className="text-red-500 text-sm">
                  {errors.tagCloud.message}
                </span>
              )}
              <Separator className="my-2" />
              <Controller
                control={control}
                name="tagCloud"
                render={({ field }) => (
                  <ToggleGroup
                    type="multiple"
                    className="flex-wrap"
                    value={field.value}
                    onValueChange={field.onChange}>
                    <ToggleGroupItem value="Healthy" className="rounded-xl">
                      Healthy
                    </ToggleGroupItem>
                    <ToggleGroupItem value="Snack" className="rounded-xl">
                      Snack
                    </ToggleGroupItem>
                    <ToggleGroupItem value="Mexican" className="rounded-xl">
                      Mexican
                    </ToggleGroupItem>
                    <ToggleGroupItem value="American" className="rounded-xl">
                      American
                    </ToggleGroupItem>
                    <ToggleGroupItem value="Dinner" className="rounded-xl">
                      Dinner
                    </ToggleGroupItem>
                    <ToggleGroupItem value="Lunch" className="rounded-xl">
                      Lunch
                    </ToggleGroupItem>
                    <ToggleGroupItem value="Breakfast" className="rounded-xl">
                      Breakfast
                    </ToggleGroupItem>
                    <ToggleGroupItem value="Dessert" className="rounded-xl">
                      Dessert
                    </ToggleGroupItem>
                    <ToggleGroupItem value="Vegetarian" className="rounded-xl">
                      Vegetarian
                    </ToggleGroupItem>
                  </ToggleGroup>
                )}
              />
            </fieldset>
            <Separator />

            <fieldset>
              <Label>Nutritions</Label>
              <Separator className="my-2" />
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Label
                    htmlFor="fats"
                    className={`${errors.fats && 'text-red-500'}`}>
                    Fats
                  </Label>
                  <Input
                    id="fats"
                    type="text"
                    className="max-w-[4rem] rounded-xl"
                    defaultValue="0"
                    max={100}
                    {...register('fats')}
                  />
                  {errors.fats && (
                    <span className="text-red-500 text-sm">
                      {errors.fats.message}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Label
                    htmlFor="carbs"
                    className={`${errors.carbs && 'text-red-500'}`}>
                    Carbs
                  </Label>
                  <Input
                    id="carbs"
                    type="text"
                    className="max-w-[4rem] rounded-xl"
                    defaultValue="0"
                    max={200}
                    {...register('carbs')}
                  />
                  {errors.carbs && (
                    <span className="text-red-500 text-sm">
                      {errors.carbs.message}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Label
                    htmlFor="protein"
                    className={`${errors.protein && 'text-red-500'}`}>
                    Protein
                  </Label>
                  <Input
                    id="protein"
                    type="text"
                    className="max-w-[4rem] rounded-xl"
                    defaultValue="0"
                    max={100}
                    {...register('protein')}
                  />
                  {errors.protein && (
                    <span className="text-red-500 text-sm">
                      {errors.protein.message}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Label
                    htmlFor="calories"
                    className={`${errors.calories && 'text-red-500'}`}>
                    Calories
                  </Label>
                  <Input
                    id="calories"
                    type="text"
                    className="max-w-[4rem] rounded-xl"
                    defaultValue="0"
                    max={1000}
                    {...register('calories')}
                  />
                  {errors.calories && (
                    <span className="text-red-500 text-sm">
                      {errors.calories.message}
                    </span>
                  )}
                </div>
              </div>
            </fieldset>
            <Separator />

            <fieldset>
              <Label
                htmlFor="direction"
                className={`${errors.direction && 'text-red-500'}`}>
                Direction
              </Label>
              <Textarea
                id="direction"
                {...register('direction')}
                className="rounded-xl"
              />
              {errors.direction && (
                <span className="text-red-500 text-sm">
                  {errors.direction.message}
                </span>
              )}
            </fieldset>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => reset()} className="rounded-xl">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="rounded-xl"
              type="submit"
              disabled={Object.keys(errors).length > 0}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}

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
  Checkbox,
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

  isMainDish: boolean
  isBreakfast: boolean
  isLunch: boolean
  isDinner: boolean
  isDessert: boolean
  isSnack: boolean

  tagCloud: string[]

  fats: number
  carbs: number
  fiber: number
  sugar: number
  protein: number
  calories: number
  cholesterol: number

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
      tagCloud: [],
      isMainDish: false,
      isBreakfast: false,
      isLunch: false,
      isDinner: false,
      isDessert: false,
      isSnack: false
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
          title: error.response?.data?.error || 'Creating recipe failed'
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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Create custom recipe</Button>
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
              <Input type="text" id="food-name" {...register('foodName')} />
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
              <Label>Type of Dish</Label>
              <Separator className="my-2" />
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Controller
                    control={control}
                    name="isMainDish"
                    render={({ field }) => (
                      <Checkbox
                        id="main-dish"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                  <Label htmlFor="main-dish">Main Dish</Label>
                  {errors.isMainDish && (
                    <span className="text-red-500 text-sm">
                      {errors.isMainDish.message}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Controller
                    control={control}
                    name="isBreakfast"
                    render={({ field }) => (
                      <Checkbox
                        id="breakfast"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                  <Label htmlFor="breakfast">Breakfast</Label>
                  {errors.isBreakfast && (
                    <span className="text-red-500 text-sm">
                      {errors.isBreakfast.message}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Controller
                    control={control}
                    name="isLunch"
                    render={({ field }) => (
                      <Checkbox
                        id="lunch"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                  <Label htmlFor="lunch">Lunch</Label>
                  {errors.isLunch && (
                    <span className="text-red-500 text-sm">
                      {errors.isLunch.message}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Controller
                    control={control}
                    name="isDinner"
                    render={({ field }) => (
                      <Checkbox
                        id="dinner"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                  <Label htmlFor="dinner">Dinner</Label>
                  {errors.isDinner && (
                    <span className="text-red-500 text-sm">
                      {errors.isDinner.message}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Controller
                    control={control}
                    name="isDessert"
                    render={({ field }) => (
                      <Checkbox
                        id="dessert"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                  <Label htmlFor="dessert">Dessert</Label>
                  {errors.isDessert && (
                    <span className="text-red-500 text-sm">
                      {errors.isDessert.message}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Controller
                    control={control}
                    name="isSnack"
                    render={({ field }) => (
                      <Checkbox
                        id="snack"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                  <Label htmlFor="snack">Snack</Label>
                  {errors.isSnack && (
                    <span className="text-red-500 text-sm">
                      {errors.isSnack.message}
                    </span>
                  )}
                </div>
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
                    <ToggleGroupItem value="Healthy">Healthy</ToggleGroupItem>
                    <ToggleGroupItem value="Romantic">Romantic</ToggleGroupItem>
                    <ToggleGroupItem value="Mexican">Mexican</ToggleGroupItem>
                    <ToggleGroupItem value="American">American</ToggleGroupItem>
                    <ToggleGroupItem value="Dinner">Dinner</ToggleGroupItem>
                    <ToggleGroupItem value="Lunch">Lunch</ToggleGroupItem>
                    <ToggleGroupItem value="Breakfast">
                      Breakfast
                    </ToggleGroupItem>
                    <ToggleGroupItem value="Low Carb">Low Carb</ToggleGroupItem>
                    <ToggleGroupItem value="Vegetarian">
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
                    className="max-w-[4rem]"
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
                    className="max-w-[4rem]"
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
                    htmlFor="fiber"
                    className={`${errors.fiber && 'text-red-500'}`}>
                    Fiber
                  </Label>
                  <Input
                    id="fiber"
                    type="text"
                    className="max-w-[4rem]"
                    defaultValue="0"
                    max={100}
                    {...register('fiber')}
                  />
                  {errors.fiber && (
                    <span className="text-red-500 text-sm">
                      {errors.fiber.message}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Label
                    htmlFor="sugar"
                    className={`${errors.sugar && 'text-red-500'}`}>
                    Sugar
                  </Label>
                  <Input
                    id="sugar"
                    type="text"
                    className="max-w-[4rem]"
                    defaultValue="0"
                    max={100}
                    {...register('sugar')}
                  />
                  {errors.sugar && (
                    <span className="text-red-500 text-sm">
                      {errors.sugar.message}
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
                    className="max-w-[4rem]"
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
                    className="max-w-[4rem]"
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
                <div className="flex items-center gap-2">
                  <Label
                    htmlFor="cholesterol"
                    className={`${errors.cholesterol && 'text-red-500'}`}>
                    Cholesterol
                  </Label>
                  <Input
                    id="cholesterol"
                    type="text"
                    className="max-w-[4rem]"
                    defaultValue="0"
                    max={300}
                    {...register('cholesterol')}
                  />
                  {errors.cholesterol && (
                    <span className="text-red-500 text-sm">
                      {errors.cholesterol.message}
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
              <Textarea id="direction" {...register('direction')} />
              {errors.direction && (
                <span className="text-red-500 text-sm">
                  {errors.direction.message}
                </span>
              )}
            </fieldset>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => reset()}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
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

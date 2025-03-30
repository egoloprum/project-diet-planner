'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Recipe } from '@/src/shared/model'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
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

interface RecipeEditModalProps {
  userId: string
  recipe: Recipe
}

type RecipeEditModalData = {
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

export const RecipeEditModal: FC<RecipeEditModalProps> = ({
  userId,
  recipe
}) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<RecipeEditModalData>({
    resolver: zodResolver(RecipeValidator),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      isMainDish: recipe.is_main_dish,
      isBreakfast: recipe.is_breakfast,
      isLunch: recipe.is_lunch,
      isDinner: recipe.is_dinner,
      isDessert: recipe.is_dessert,
      isSnack: recipe.is_snack,
      tagCloud: recipe.tag_cloud.split(' '),
      direction: recipe.directions.join(' ')
    }
  })

  const router = useRouter()

  const onSubmit: SubmitHandler<RecipeEditModalData> = async data => {
    try {
      await axios.patch('/api/custom-recipe/update', {
        ...data,
        recipe_id: recipe.recipe_id,
        userId: userId
      })

      toast.success('Recipe is edited successfully!')

      router.refresh()
      reset()
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-h-[80%] overflow-y-auto">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Recipe</AlertDialogTitle>
            <AlertDialogDescription>
              User can edit their custom recipe.
            </AlertDialogDescription>
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
                  defaultValue={recipe.food_name}
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
                    defaultValue={`${recipe.prep_time}`}
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
                    defaultValue={`${recipe.cook_time}`}
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
                          defaultChecked={recipe.is_main_dish}
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
                          defaultChecked={recipe.is_breakfast}
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
                          defaultChecked={recipe.is_lunch}
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
                          defaultChecked={recipe.is_dinner}
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
                          defaultChecked={recipe.is_dessert}
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
                          defaultChecked={recipe.is_snack}
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
                      <ToggleGroupItem value="Romantic">
                        Romantic
                      </ToggleGroupItem>
                      <ToggleGroupItem value="Mexican">Mexican</ToggleGroupItem>
                      <ToggleGroupItem value="American">
                        American
                      </ToggleGroupItem>
                      <ToggleGroupItem value="Dinner">Dinner</ToggleGroupItem>
                      <ToggleGroupItem value="Lunch">Lunch</ToggleGroupItem>
                      <ToggleGroupItem value="Breakfast">
                        Breakfast
                      </ToggleGroupItem>
                      <ToggleGroupItem value="Low Carb">
                        Low Carb
                      </ToggleGroupItem>
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
                      defaultValue={`${recipe.nutritions.fat}`}
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
                      defaultValue={`${recipe.nutritions.carbs}`}
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
                      defaultValue={`${recipe.nutritions.fiber}`}
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
                      defaultValue={`${recipe.nutritions.sugar}`}
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
                      defaultValue={`${recipe.nutritions.protein}`}
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
                      defaultValue={`${recipe.nutritions.calories}`}
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
                      defaultValue={`${recipe.nutritions.cholesterol}`}
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
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              type="submit"
              disabled={Object.keys(errors).length > 0}>
              Create Custom Recipe
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}

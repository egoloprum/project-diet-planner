'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { SquarePlus, SquareX } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC, useRef } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'

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
import { Button, Input, Label, Separator, Textarea } from '@/src/shared/ui'

import { blogValidator } from './lib/validations'

interface BlogCreateModalProps {
  userId: string
}

type BlogCreateData = {
  name: string
  description: string | null
  list?: {
    header: string
    text: string
    recipe_id: number
  }[]
}

export const BlogCreateModal: FC<BlogCreateModalProps> = ({ userId }) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    setError,
    formState: { errors }
  } = useForm<BlogCreateData>({
    resolver: zodResolver(blogValidator),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      list: [
        {
          header: '',
          text: '',
          recipe_id: undefined as unknown as number
        }
      ]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'list'
  })

  const router = useRouter()
  const { toast } = useToast()

  const checkRecipeExists = async (recipeId: number) => {
    try {
      const response = await axios.get('/api/recipe/get', {
        params: { id: recipeId }
      })
      return response.status === 200
    } catch {
      return false
    }
  }

  const onSubmit: SubmitHandler<BlogCreateData> = async data => {
    if (!data || !data.list) {
      return
    }

    const recipeChecks = await Promise.all(
      data.list.map(item => checkRecipeExists(item.recipe_id))
    )

    const invalidRecipes = recipeChecks
      .map((exists, index) => (!exists ? index : null))
      .filter(index => index !== null) as number[]

    if (invalidRecipes.length > 0) {
      invalidRecipes.forEach(index => {
        setError(`list.${index}.recipe_id`, {
          type: 'manual',
          message: 'Recipe not found'
        })
      })
      return
    }

    try {
      await axios.post('/api/blog/create', {
        ...data,
        userId: userId
      })

      toast({
        variant: 'default',
        title: 'Blog is successfully created!'
      })

      router.refresh()
      reset()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          variant: 'destructive',
          title: error.response?.data?.error || 'Creating blog failed!'
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'An unexpected error occurred!'
        })
      }
    }
  }

  const recipesRef = useRef<HTMLDivElement>(null)

  const addItem = () => {
    append({ header: '', text: '', recipe_id: undefined as unknown as number })
  }

  const deleteItem = (index: number) => {
    remove(index)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="rounded-xl">
          Create blog
        </Button>
      </AlertDialogTrigger>
      <Separator className="my-4" />
      <AlertDialogContent className="max-h-[80%] overflow-y-auto">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <AlertDialogHeader>
            <AlertDialogTitle>Create Blog</AlertDialogTitle>
            <AlertDialogDescription>
              User can create any blog about recipes they want.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex flex-col gap-4">
            <div>
              <Label
                htmlFor="name"
                className={`${errors.name && 'text-red-500'}`}>
                Blog name
              </Label>
              <Input
                type="text"
                id="name"
                {...register('name')}
                className="rounded-xl"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div>
              <Label
                htmlFor="description"
                className={`${errors.description && 'text-red-500'}`}>
                Blog description
              </Label>
              <Textarea
                id="description"
                {...register('description')}
                className="rounded-xl"
              />
              {errors.description && (
                <span className="text-red-500 text-sm">
                  {errors.description.message}
                </span>
              )}
            </div>
            <Separator />
            <div ref={recipesRef}>
              <div className="flex gap-4 justify-between items-center">
                <Label>Blog Recipes</Label>
                <Button
                  className="w-8 h-8"
                  variant="ghost"
                  type="button"
                  onClick={addItem}>
                  <SquarePlus />
                </Button>
              </div>
              <Separator className="my-4" />
              <ul className="flex flex-col gap-4">
                {fields.map((item, index) => (
                  <li key={item.id} className="flex flex-col pl-4">
                    <div className="flex gap-4 justify-between items-center">
                      <Label>{index + 1} - Blog item</Label>
                      <Button
                        className="w-8 h-8"
                        variant="ghost"
                        type="button"
                        id={`${item.id}`}
                        onClick={() => deleteItem(index)}>
                        <SquareX />
                      </Button>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div>
                        <Label
                          htmlFor={`list-${index}-header`}
                          className={`${errors.list?.[index]?.header && 'text-red-500'}`}>
                          Header text
                        </Label>
                        <Input
                          id={`list-${index}-header`}
                          {...register(`list.${index}.header`)}
                          className="rounded-xl"
                        />
                        {errors.list?.[index]?.header && (
                          <span className="text-red-500 text-sm">
                            {errors.list?.[index]?.header?.message}
                          </span>
                        )}
                      </div>
                      <div>
                        <Label
                          htmlFor={`list-${index}-text`}
                          className={`${errors.list?.[index]?.text && 'text-red-500'}`}>
                          Description
                        </Label>
                        <Textarea
                          id={`list-${index}-text`}
                          {...register(`list.${index}.text`)}
                          className="rounded-xl"
                        />
                        {errors.list?.[index]?.text && (
                          <span className="text-red-500 text-sm">
                            {errors.list?.[index]?.text?.message}
                          </span>
                        )}
                      </div>
                      <div>
                        <Label htmlFor={`list-${index}-recipe_id`}>
                          Recipe ID
                        </Label>
                        <Input
                          type="number"
                          id={`list-${index}-recipe_id`}
                          className="rounded-xl"
                          {...register(`list.${index}.recipe_id`, {
                            valueAsNumber: true,
                            validate: value =>
                              value > 0 || 'Must be positive number'
                          })}
                        />
                        {errors.list?.[index]?.recipe_id && (
                          <span className="text-red-500 text-sm">
                            {errors.list?.[index]?.recipe_id?.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <Separator className="mt-4" />
                  </li>
                ))}
              </ul>
            </div>
            <Separator />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => reset()} className="rounded-xl">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              type="submit"
              disabled={Object.keys(errors).length > 0}
              className="rounded-xl">
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}

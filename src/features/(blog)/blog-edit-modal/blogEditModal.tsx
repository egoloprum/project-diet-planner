'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { SquarePlus, SquareX } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC, useRef } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'

import { useToast } from '@/src/shared/hooks'
import { Blog } from '@/src/shared/model'
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
  Input,
  Label,
  Separator,
  Textarea
} from '@/src/shared/ui'

import { blogValidator } from './lib/validations'

interface BlogEditModalProps {
  userId: string
  blog: Blog
}

type BlogEditModalData = {
  name: string
  description: string | null
  list?: {
    header: string
    text: string
    id: number
  }[]
}

export const BlogEditModal: FC<BlogEditModalProps> = ({ userId, blog }) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm<BlogEditModalData>({
    resolver: zodResolver(blogValidator),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      name: blog.name,
      description: blog.description,
      list: blog.list || []
    }
  })

  const router = useRouter()
  const { toast } = useToast()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'list'
  })

  const recipesRef = useRef<HTMLDivElement>(null)

  const addItem = () => {
    append({ header: '', text: '', id: 0 })
  }

  const deleteItem = (index: number) => {
    remove(index)
  }

  const onSubmit: SubmitHandler<BlogEditModalData> = async data => {
    try {
      await axios.patch('/api/blog/update', {
        ...data,
        id: blog.id,
        userId: userId
      })

      toast({
        variant: 'default',
        title: 'Collection is edited successfully!'
      })

      router.refresh()
      reset()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          variant: 'destructive',
          title: error.response?.data?.error || 'Edit failed!'
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
        <Button variant="outline" className="w-full rounded-xl">
          Edit Blog
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-h-[80%] overflow-y-auto">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Blog</AlertDialogTitle>
            <AlertDialogDescription>
              User can edit their blog.
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
                        <Label htmlFor={`list-${index}-id`}>Recipe ID</Label>
                        <Input
                          type="number"
                          id={`list-${index}-id`}
                          {...register(`list.${index}.id`, {
                            valueAsNumber: true,
                            validate: value =>
                              value > 0 || 'Must be positive number'
                          })}
                          className="rounded-xl"
                        />
                        {errors.list?.[index]?.id && (
                          <span className="text-red-500">
                            {errors.list?.[index]?.id?.message}
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

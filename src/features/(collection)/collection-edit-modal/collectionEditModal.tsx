'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useToast } from '@/src/shared/hooks'
import { Collection } from '@/src/shared/model'
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

import { CollectionValidator } from './lib/validations'

interface CollectionEditModalProps {
  userId: string
  collection: Collection
}

type CollectionEditModalData = {
  name: string
  description: string | null
}

export const CollectionEditModal: FC<CollectionEditModalProps> = ({
  userId,
  collection
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CollectionEditModalData>({
    resolver: zodResolver(CollectionValidator),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      name: collection.name,
      description: collection.description
    }
  })

  const router = useRouter()
  const { toast } = useToast()

  const onSubmit: SubmitHandler<CollectionEditModalData> = async data => {
    try {
      await axios.patch('/api/collection/update', {
        ...data,
        id: collection.id,
        user_id: userId,
        recipes: collection.recipes
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
        <Button variant="outline" className="w-full">
          Edit Collection
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-h-[80%] overflow-y-auto">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Collection</AlertDialogTitle>
            <AlertDialogDescription>
              User can edit their collection.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex flex-col gap-4">
            <div>
              <Label
                htmlFor="name"
                className={`${errors.name && 'text-red-500'}`}>
                Collection name
              </Label>
              <Input type="text" id="name" {...register('name')} />
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
                Collection description
              </Label>
              <Textarea id="description" {...register('description')} />
              {errors.description && (
                <span className="text-red-500 text-sm">
                  {errors.description.message}
                </span>
              )}
            </div>
            <Separator />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
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

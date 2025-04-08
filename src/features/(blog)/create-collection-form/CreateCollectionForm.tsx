'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

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

import { CollectionValidator } from './lib/validations'

interface CreateCollectionFormProps {
  userId: string
}

type CreateCollectionData = {
  name: string
  description: string | null
}

export const CreateCollectionForm: FC<CreateCollectionFormProps> = ({
  userId
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CreateCollectionData>({
    resolver: zodResolver(CollectionValidator),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {}
  })

  const router = useRouter()
  const { toast } = useToast()

  const onSubmit: SubmitHandler<CreateCollectionData> = async data => {
    try {
      await axios.post('/api/collection/create', {
        ...data,
        userId: userId
      })

      toast({
        variant: 'default',
        title: 'Collection is successfuly created!'
      })

      router.refresh()
      reset()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          variant: 'destructive',
          title: error.response?.data?.error || 'Creating collection failed'
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
        <Button variant="outline">Create collection</Button>
      </AlertDialogTrigger>
      <Separator className="my-4" />
      <AlertDialogContent className="max-h-[80%] overflow-y-auto">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <AlertDialogHeader>
            <AlertDialogTitle>Create Collection</AlertDialogTitle>
            <AlertDialogDescription>
              User can create any collection they want.
            </AlertDialogDescription>
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
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              type="submit"
              disabled={Object.keys(errors).length > 0}>
              Create Collection
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}

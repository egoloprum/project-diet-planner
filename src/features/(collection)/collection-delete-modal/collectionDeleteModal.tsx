'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

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
  AlertDialogTrigger,
  Button
} from '@/src/shared/ui'

interface CollectionDeleteModalProps {
  collectionId: number
}

export const CollectionDeleteModal: FC<CollectionDeleteModalProps> = ({
  collectionId
}) => {
  const router = useRouter()
  const { toast } = useToast()

  const OnClick = async () => {
    try {
      await axios.delete('/api/collection/delete', {
        data: {
          collectionId: collectionId
        }
      })

      toast({
        variant: 'default',
        title: 'Collection is successfuly deleted!'
      })

      router.push('/collections')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          variant: 'destructive',
          title: error.response?.data?.error || 'Deletion failed!'
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
          Delete Collection
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-h-[80%] overflow-y-auto">
        <form className="flex flex-col gap-6">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Collection</AlertDialogTitle>
            <AlertDialogDescription>
              User can delete their collection.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={OnClick}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}

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

interface RecipeDeleteModalProps {
  recipeId: number
}

export const RecipeDeleteModal: FC<RecipeDeleteModalProps> = ({ recipeId }) => {
  const router = useRouter()
  const { toast } = useToast()

  const OnClick = async () => {
    try {
      await axios.delete('/api/custom-recipe/delete', {
        data: {
          recipeId: recipeId
        }
      })

      toast({
        variant: 'default',
        title: 'Recipe is successfuly deleted!'
      })

      router.push('/custom-recipe')
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
        <Button variant="outline">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-h-[80%] overflow-y-auto">
        <form className="flex flex-col gap-6">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Recipe</AlertDialogTitle>
            <AlertDialogDescription>
              User can delete their custom recipe.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={OnClick}>
              Delete this recipe
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}

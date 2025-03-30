'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import toast from 'react-hot-toast'

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

  const OnClick = async () => {
    try {
      await axios.delete('/api/custom-recipe/delete', {
        data: {
          recipeId: recipeId
        }
      })
      toast.success('Recipe is deleted successfully!')
      router.push('/custom-recipe')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || 'Deletion failed')
      } else {
        toast.error('An unexpected error occurred')
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

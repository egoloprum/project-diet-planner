'use client'

import axios from 'axios'
import { Trash } from 'lucide-react'
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

interface DeletePlanBtnProps {
  userId: string
  currentDate: string
}

export const DeletePlanBtn: FC<DeletePlanBtnProps> = ({
  userId,
  currentDate
}) => {
  const router = useRouter()
  const { toast } = useToast()

  const handleClick = async () => {
    try {
      await axios.delete('/api/planner/delete', {
        data: {
          userId: userId,
          date: currentDate
        }
      })

      toast({
        variant: 'default',
        title: 'Planner is successfuly deleted!'
      })

      router.refresh()
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
        <Button
          variant="ghost"
          className="aspect-square rounded-full h-10 w-10">
          <Trash className="w-6 h-6" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-h-[80%] overflow-y-auto">
        <form className="flex flex-col gap-6">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Planner</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete your planner for {currentDate}?
              This action will permanently remove all your plans and data
              associated with this date. Once deleted, you will no longer be
              able to access or restore this planner. However, you can always
              create a new planner if you change your mind.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleClick} className="rounded-xl">
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}

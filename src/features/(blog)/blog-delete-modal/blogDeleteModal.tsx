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

interface BlogDeleteModalProps {
  blogId: number
}

export const BlogDeleteModal: FC<BlogDeleteModalProps> = ({ blogId }) => {
  const router = useRouter()
  const { toast } = useToast()

  const OnClick = async () => {
    try {
      await axios.delete('/api/blog/delete', {
        data: {
          blogId: blogId
        }
      })

      toast({
        variant: 'default',
        title: 'Blog is successfuly deleted!'
      })

      router.push('/blog')
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
          Delete Blog
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-h-[80%] overflow-y-auto">
        <form className="flex flex-col gap-6">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Blog</AlertDialogTitle>
            <AlertDialogDescription>
              User can delete their blog.
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

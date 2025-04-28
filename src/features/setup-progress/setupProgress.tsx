'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

import { Button } from '@/src/shared/ui'
import { FC } from 'react'
import axios from 'axios'
import { useToast } from '@/src/shared/hooks'

// profile is path where height, weight, sex and activity level are added

// goal is path where regime is selected

// nutrition is path where user can see suggested nutritional values

// meals is path where user can add or remove type of meals per day

const paths = [
  'setup',
  'diet',
  'exclusions',
  'profile',
  'goal',
  'nutrition',
  'meals'
]

interface SetupProgressProps {
  userId: string
}

export const SetupProgress: FC<SetupProgressProps> = ({ userId }) => {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()

  const currentStep = pathname.split('/').pop() || ''
  const currentIndex = paths.indexOf(currentStep)

  const handleBack = () => {
    if (currentIndex <= 0) return

    const previousIndex = currentIndex - 1
    const previousPath =
      previousIndex === 0 ? '/setup' : `/setup/${paths[previousIndex]}`
    router.push(previousPath)
  }

  const handleContinue = () => {
    if (currentIndex >= paths.length - 1) return

    const nextIndex = currentIndex + 1
    const nextPath = `/setup/${paths[nextIndex]}`
    router.push(nextPath)
  }

  const handleFinish = async () => {
    try {
      await axios.patch('/api/profile/finish-setup', {
        userId: userId
      })

      toast({
        variant: 'default',
        title: 'Setup is successfully done!'
      })

      router.refresh()
      // router.push('/planner')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          variant: 'destructive',
          title: error.response?.data?.error || 'Setup failed!'
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
    <footer className="border-t w-full p-4 px-8 sticky bottom-0 bg-white flex justify-between max-h-fit">
      {currentIndex > 0 ? (
        <Button
          variant="ghost"
          className="flex gap-2 items-center"
          onClick={handleBack}>
          <ArrowLeft />
          <span>Back</span>
        </Button>
      ) : (
        <div></div>
      )}

      {currentIndex === paths.length - 1 ? (
        <Button
          variant="default"
          className="flex gap-2 items-center"
          onClick={handleFinish}>
          <span>Finish</span>
          <ArrowRight />
        </Button>
      ) : (
        <Button
          variant="default"
          className="flex gap-2 items-center"
          onClick={handleContinue}>
          <span>Continue </span>
          <ArrowRight />
        </Button>
      )}
    </footer>
  )
}

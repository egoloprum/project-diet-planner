'use client'

import axios from 'axios'
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'

import { useToast } from '@/src/shared/hooks'
import { Button } from '@/src/shared/ui'

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

  const [isNavigatingBack, setIsNavigatingBack] = useState<boolean>(false)
  const [isNavigatingForward, setIsNavigatingForward] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const currentStep = pathname.split('/').pop() || ''
  const currentIndex = paths.indexOf(currentStep)

  useEffect(() => {
    setIsNavigatingBack(false)
    setIsNavigatingForward(false)
  }, [pathname])

  const handleBack = () => {
    if (currentIndex <= 0 || isNavigatingBack || isLoading) return

    setIsNavigatingBack(true)
    const previousIndex = currentIndex - 1
    const previousPath =
      previousIndex === 0 ? '/setup' : `/setup/${paths[previousIndex]}`
    router.push(previousPath)
  }

  const handleContinue = () => {
    if (currentIndex >= paths.length - 1 || isNavigatingForward || isLoading)
      return

    setIsNavigatingForward(true)
    const nextIndex = currentIndex + 1
    const nextPath = `/setup/${paths[nextIndex]}`
    router.push(nextPath)
  }

  const handleFinish = async () => {
    try {
      setIsLoading(true)
      await axios.patch('/api/profile/finish-setup', {
        userId: userId
      })

      toast({
        variant: 'default',
        title: 'Setup is successfully done!'
      })

      // router.refresh()
      router.push('/planner')
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
    } finally {
      setIsLoading(false)
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
          <span className="flex gap-2 items-center">
            {isNavigatingBack && <Loader2 className="h-4 w-4 animate-spin" />}
            Back
          </span>
        </Button>
      ) : (
        <div></div>
      )}

      {currentIndex === paths.length - 1 ? (
        <Button
          variant="default"
          className="flex gap-2 items-center"
          onClick={handleFinish}>
          <span className="flex gap-2 items-center">
            Finish
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          </span>
          <ArrowRight />
        </Button>
      ) : (
        <Button
          variant="default"
          className="flex gap-2 items-center"
          onClick={handleContinue}>
          <span className="flex gap-2 items-center">
            Continue
            {isNavigatingForward && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
          </span>
          <ArrowRight />
        </Button>
      )}
    </footer>
  )
}

'use client'

import toast from 'react-hot-toast'

import { signOut } from '@/src/shared/db/supabase/signin'
import { Button } from '@/src/shared/ui/button'

export const LogoutBtn = ({}) => {
  const SignoutHandler = async () => {
    try {
      await signOut()
      toast.success('Successfully signed out!')
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  return (
    <Button variant="ghost" onClick={SignoutHandler}>
      Sign out
    </Button>
  )
}

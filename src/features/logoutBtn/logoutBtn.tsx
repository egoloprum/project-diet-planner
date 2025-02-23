"use client"

import { signOut } from '@/src/app/db/supabase/signin'
import { Button } from '@/src/shared/ui/button'

export const LogoutBtn = ({}) => {
  const SignoutHandler = async () => {
    try {
      await signOut()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Button variant='ghost' onClick={SignoutHandler}>Sign out</Button>
  )
}


'use client'

import { signOut } from '@/src/shared/db/supabase/signin'
import { useToast } from '@/src/shared/hooks'
import { Button } from '@/src/shared/ui/button'

export const LogoutBtn = ({}) => {
  const { toast } = useToast()

  const SignoutHandler = async () => {
    try {
      await signOut()

      toast({
        variant: 'default',
        title: 'Successfully signed out!'
      })
    } catch {}
  }

  return (
    <Button variant="ghost" onClick={SignoutHandler}>
      Sign out
    </Button>
  )
}

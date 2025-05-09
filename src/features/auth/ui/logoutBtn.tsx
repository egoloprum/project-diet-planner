'use client'

import { Button } from '@/src/shared/ui/button'

import { SignoutHandler } from '../lib/helper'

export const LogoutBtn = ({}) => {
  return (
    <Button
      variant="ghost"
      onClick={SignoutHandler}
      className="rounded-xl text-base sm:text-lg md:text-xl">
      Sign out
    </Button>
  )
}

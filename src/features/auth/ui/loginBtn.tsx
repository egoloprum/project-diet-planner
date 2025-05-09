'use client'

import { Button } from '@/src/shared/ui/button'

import Google from '../assets/google.svg'
import { LoginGoogleHandler } from '../lib/helper'

export const LoginBtn = ({}) => {
  return (
    <Button type="button" onClick={LoginGoogleHandler}>
      <Google /> Log in with google
    </Button>
  )
}

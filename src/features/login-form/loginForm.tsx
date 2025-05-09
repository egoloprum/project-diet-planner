'use client'

import { signInWithGoogle } from '@/src/shared/db/supabase/signin'
import { useToast } from '@/src/shared/hooks'
import { Separator } from '@/src/shared/ui'
import { Button } from '@/src/shared/ui/button'

import Google from './assets/google.svg'

export const LoginForm = ({}) => {
  const { toast } = useToast()

  const LoginGoogleHandler = async () => {
    try {
      await signInWithGoogle()
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: 'destructive',
          title: error.message
        })
      }
    }
  }

  // const LoginAnonHandler = async () => {
  //   try {
  //     await signInWithAnon()
  //     toast({
  //       variant: 'default',
  //       title: 'Successfully signed in!'
  //     })
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       toast({
  //         variant: 'destructive',
  //         title: error.message
  //       })
  //     }
  //   }
  // }

  return (
    <form className="border-2 rounded-xl p-4 max-w-96 w-full flex flex-col gap-4 mt-6">
      <h1 className="font-bold text-center text-base md:text-xl lg:text-2xl">
        Sign up or Log in
      </h1>
      <p className="text-gray-500 text-sm md:text-base">
        Using google provider secures the user data, integraty of application.
      </p>
      <Separator />
      <Button type="button" onClick={LoginGoogleHandler}>
        <Google /> Log in with google
      </Button>
      {/* <Button type="button" variant="secondary" onClick={LoginAnonHandler}>
        Log in anonymously
      </Button> */}
    </form>
  )
}

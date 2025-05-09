'use client'

import { signInWithGoogle, signOut } from '@/src/shared/db/supabase/signin'

export const SignoutHandler = async () => {
  try {
    await signOut()
  } catch {}
}

export const LoginGoogleHandler = async () => {
  try {
    await signInWithGoogle()
  } catch {}
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

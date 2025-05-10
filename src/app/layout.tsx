import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

import { createClient } from '@/src/shared/db/supabase'
import { AuthNavbar, Navbar } from '@/src/widgets/navbar'

import { getProfile } from '../entities/profile'
import { Toaster } from '../shared/ui'

const montserrat = Montserrat({
  weight: '500',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Diet planner',
  description: 'App is for planning diets.'
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  const profile = await getProfile(data.user?.id || '')

  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        <div className="border-b flex justify-center ">
          {data.user ? <AuthNavbar /> : <Navbar />}
        </div>
        <main
          className={`min-h-[calc(100vh-120x)] px-4 sm:px-8 mt-6 ${profile?.is_setup && 'mb-12'}`}>
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  )
}

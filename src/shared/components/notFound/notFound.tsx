'use client'

import Link from 'next/link'
import { FC } from 'react'

import { Label } from '../../ui'

interface NotFoundProps {
  href: string
  text?: string
}

export const NotFound: FC<NotFoundProps> = ({ href, text }) => {
  return (
    <div className="p-4 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
      <Label htmlFor={href} className="text-lg font-bold">
        404 - Page Not Found
      </Label>
      <p className="mt-2">
        {text || 'Sorry, the page you are looking for does not exist.'}
      </p>
      <Link
        id={href}
        href={href}
        className="p-4 border-2 mt-4 inline-block w-full hover:bg-gray-100 active:bg-gray-200">
        Go to {href.split('/')} page
      </Link>
    </div>
  )
}

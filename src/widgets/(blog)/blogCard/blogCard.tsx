'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { Blog } from '@/src/shared/model'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/src/shared/ui/card'

interface BlogCardProps {
  blog: Blog
}

export const BlogCard: FC<BlogCardProps> = ({ blog }) => {
  return (
    <Card className="max-w-[300px] w-full">
      <CardHeader>
        <CardTitle>
          <Link
            href={`blog/${blog.id}`}
            className="cursor-pointer hover:underline">
            {blog.name}
          </Link>
        </CardTitle>
        <CardDescription className="truncate">
          {blog.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative w-full overflow-hidden rounded-lg shadow-md h-60">
        <Image
          src={'/image_blog.jpg'}
          className="transition-transform duration-300 ease-in-out transform hover:scale-105 object-cover"
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
          alt={blog.name}
        />
      </CardContent>
    </Card>
  )
}

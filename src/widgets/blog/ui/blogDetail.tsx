import Image from 'next/image'
import { FC } from 'react'

import { Blog } from '@/src/entities/blog'

interface BlogDetailProps {
  blog: Blog
  userId: string
}

const cleanTime = (date: string): string => {
  const createdAtDate: Date = new Date(date)
  const now: Date = new Date()

  const seconds: number = Math.floor(
    (now.getTime() - createdAtDate.getTime()) / 1000
  )
  const minutes: number = Math.floor(seconds / 60)
  const hours: number = Math.floor(minutes / 60)
  const days: number = Math.floor(hours / 24)
  const months: number = Math.floor(days / 30)
  const years: number = Math.floor(days / 365)

  if (seconds < 60) {
    return seconds === 1 ? 'one second ago' : `${seconds} seconds ago`
  } else if (minutes < 60) {
    return minutes === 1 ? 'one minute ago' : `${minutes} minutes ago`
  } else if (hours < 24) {
    return hours === 1 ? 'one hour ago' : `${hours} hours ago`
  } else if (days < 30) {
    return days === 1 ? 'yesterday' : `${days} days ago`
  } else if (months < 12) {
    return months === 1 ? 'one month ago' : `${months} months ago`
  } else {
    return years === 1 ? 'one year ago' : `${years} years ago`
  }
}

export const BlogDetail: FC<BlogDetailProps> = ({ blog, userId }) => {
  return (
    <div>
      <Image
        src="/image_blog.jpg"
        height={200}
        width={200}
        loading="lazy"
        alt={blog.name}
      />
      <div>
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold capitalize">
          {blog.name}
        </h1>
        <p className="text-gray-500 text-sm sm:text-base">{blog.description}</p>
        <p className="text-gray-500 text-sm">
          Created By: {blog.user_id === userId ? 'You' : 'Others'}
        </p>
        <p className="text-gray-500 text-sm">
          Created At: {cleanTime(blog.created_at)}
        </p>
      </div>
    </div>
  )
}

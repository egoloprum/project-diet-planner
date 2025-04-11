'use client'

import { FC } from 'react'

import { Blog } from '@/src/shared/model'

interface BlogEditModalProps {
  userId: string
  blog: Blog
}

export const BlogEditModal: FC<BlogEditModalProps> = ({ userId, blog }) => {
  return <div>BlogEditModal</div>
}

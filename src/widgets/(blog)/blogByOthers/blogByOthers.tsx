'use client'

import { FC } from 'react'

import { Blog } from '@/src/shared/model'
import { Separator } from '@/src/shared/ui'

import { BlogCard } from '../blogCard'

interface BlogByOthersProps {
  blogData: Blog[] | null
}

export const BlogByOthers: FC<BlogByOthersProps> = ({ blogData }) => {
  return (
    <div className="">
      <Separator className="my-4" />
      <p className="text-lg font-bold">Blog by Others</p>

      {blogData ? (
        <div className={`py-4 gap-4 flex flex-wrap`}>
          {blogData?.map((blog: Blog) => (
            <BlogCard blog={blog} key={blog.id} />
          ))}
        </div>
      ) : (
        <p>There is not any blog from other users yet.</p>
      )}
    </div>
  )
}

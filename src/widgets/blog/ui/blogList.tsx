import { FC } from 'react'

import { Blog } from '@/src/entities/blog'

import { BlogCard } from './blogCard'

interface BlogListProps {
  blogData: Blog[] | null
}

export const BlogList: FC<BlogListProps> = ({ blogData }) => {
  return (
    <div className={`py-4 gap-4 flex flex-wrap`}>
      {blogData?.map((blog: Blog) => <BlogCard blog={blog} key={blog.id} />)}
    </div>
  )
}

import { FC } from 'react'

import { Blog } from '@/src/shared/model'

interface BlogListProps {
  blogData: Blog[] | null
}

export const BlogList: FC<BlogListProps> = ({ blogData }) => {
  return (
    <div className={`py-4 gap-4 flex flex-wrap`}>
      {blogData?.map((blog: Blog) => (
        <div key={blog.id} className="mb-4 max-w-[300px] w-full">
          {blog.name}
          {/* <CollectionCard collection={collection} /> */}
        </div>
      ))}
    </div>
  )
}

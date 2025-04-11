'use client'

import { FC, Suspense } from 'react'

import { Blog } from '@/src/shared/model'
import { Separator } from '@/src/shared/ui'

import { RecipeLink } from './itemLink'

interface BlogItemsProps {
  blog: Blog
}

export const BlogItems: FC<BlogItemsProps> = ({ blog }) => {
  return (
    <div>
      <h2 className="text-base sm:text-lg md:text-xl font-bold capitalize">
        Items
      </h2>
      <div className="w-full flex flex-col">
        {blog.list?.map(
          (
            item: {
              header: string
              text: string
              recipe_id: number
            },
            index
          ) => (
            <div key={index}>
              <div className="my-4">
                <p className="text-lg capitalize">{item.header}</p>
                <p className="text-base text-gray-500">{item.text}</p>
              </div>
              <Suspense
                fallback={
                  <div className="py-4 flex gap-2 animate-pulse">
                    <div className="w-[100px] h-[100px] bg-gray-200 rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                }>
                <RecipeLink recipe_id={item.recipe_id} />
              </Suspense>
              <Separator />
            </div>
          )
        )}
      </div>
    </div>
  )
}

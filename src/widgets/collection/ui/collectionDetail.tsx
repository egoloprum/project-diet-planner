import Image from 'next/image'
import { FC } from 'react'

import { Collection } from '@/src/entities/collection'

interface CollectionDetailProps {
  collection: Collection
  userId: string
  recipeCount: number
}

export const CollectionDetail: FC<CollectionDetailProps> = ({
  collection,
  userId,
  recipeCount
}) => {
  return (
    <div>
      <Image
        src="/image_collection.jpg"
        height={200}
        width={200}
        loading="lazy"
        alt={collection.name}
      />
      <div>
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold capitalize">
          {collection.name}
        </h1>
        <p className="text-gray-500 text-sm sm:text-base">
          {collection.description}
        </p>
        <p className="text-gray-500 text-sm">
          Created By: {collection.user_id === userId ? 'You' : 'Others'}
        </p>
        <p className="text-gray-500 text-sm">Items: {recipeCount}</p>
      </div>
    </div>
  )
}

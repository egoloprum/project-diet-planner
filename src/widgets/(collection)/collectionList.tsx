import { FC } from 'react'

import { Collection } from '@/src/shared/model'

interface CollectionListProps {
  collectionData: Collection[] | null
}

export const CollectionList: FC<CollectionListProps> = ({ collectionData }) => {
  return (
    <div className={`py-4 gap-4 recipeList`}>
      {collectionData?.map((collection: Collection) => (
        <div
          key={collection.collection_id}
          className="break-inside-avoid mb-4 min-w-[300px]">
          {collection.name}
        </div>
      ))}
    </div>
  )
}

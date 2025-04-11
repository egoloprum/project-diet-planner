import { FC } from 'react'

import { CollectionCard } from '@/src/shared/components/collectionCard'
import { Collection } from '@/src/shared/model'

interface CollectionListProps {
  collectionData: Collection[] | null
}

export const CollectionList: FC<CollectionListProps> = ({ collectionData }) => {
  return (
    <div className={`py-4 gap-4 flex flex-wrap`}>
      {collectionData?.map((collection: Collection) => (
        <div key={collection.id} className="mb-4 max-w-[300px] w-full">
          <CollectionCard collection={collection} />
        </div>
      ))}
    </div>
  )
}

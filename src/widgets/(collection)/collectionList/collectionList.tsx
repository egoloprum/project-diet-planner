import { FC } from 'react'

import { Collection } from '@/src/shared/model'

import { CollectionCard } from '../collectionCard'

interface CollectionListProps {
  collectionData: Collection[] | null
}

export const CollectionList: FC<CollectionListProps> = ({ collectionData }) => {
  return (
    <div className={`py-4 gap-4 flex flex-wrap`}>
      {collectionData?.map((collection: Collection) => (
        <CollectionCard collection={collection} key={collection.id} />
      ))}
    </div>
  )
}

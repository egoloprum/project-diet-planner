'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/src/shared/ui/card'

import { Collection } from '../../model'

interface CollectionCardProps {
  collection: Collection
}

export const CollectionCard: FC<CollectionCardProps> = ({ collection }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link
            href={`collections/${collection.id}`}
            className="cursor-pointer hover:underline">
            {collection.name}
          </Link>
        </CardTitle>
        <CardDescription>{collection.description}</CardDescription>
      </CardHeader>
      <CardContent className="relative w-full overflow-hidden rounded-lg shadow-md pb-0 h-fit">
        <Image
          src={'/image_collection.jpg'}
          className="transition-transform duration-300 ease-in-out transform hover:scale-105 object-cover"
          width={200}
          height={200}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
          alt={collection.name}
        />
      </CardContent>
    </Card>
  )
}

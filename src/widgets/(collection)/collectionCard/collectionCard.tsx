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
    <Card className="max-w-[300px] w-full">
      <CardHeader>
        <CardTitle>
          <Link
            href={`collections/${collection.id}`}
            className="cursor-pointer hover:underline">
            {collection.name}
          </Link>
        </CardTitle>
        <CardDescription className="truncate">
          {collection.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative w-full overflow-hidden rounded-lg shadow-md h-60">
        <Image
          src={'/image_collection.jpg'}
          className="transition-transform duration-300 ease-in-out transform hover:scale-105 object-cover"
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
          alt={collection.name}
        />
      </CardContent>
    </Card>
  )
}

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FC, useState } from 'react'

import { Badge } from '@/src/shared/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/src/shared/ui/card'

interface DiscoverCardProps {
  recipe: Recipe
}

export const DiscoverCard: FC<DiscoverCardProps> = ({ recipe }) => {
  const [imgSrc, setImgSrc] = useState(recipe.images.thumbnail)

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link
            href={`discover/${recipe.recipe_id}`}
            className="cursor-pointer hover:underline">
            {recipe.food_name}
          </Link>
        </CardTitle>
        <CardDescription>{recipe.tag_cloud}</CardDescription>
      </CardHeader>
      <CardContent className="relative w-full h-64 overflow-hidden rounded-lg shadow-md">
        <Image
          src={imgSrc || '/default_thumbnail_recipe.jpg'}
          className="transition-transform duration-300 ease-in-out transform hover:scale-105 object-cover"
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
          alt={recipe.food_name}
          onError={() => setImgSrc('/default_thumbnail_recipe.jpg')}
        />
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        {recipe.is_main_dish && (
          <Badge variant="outline" className="text-nowrap">
            Main Dish
          </Badge>
        )}
        {recipe.is_breakfast && (
          <Badge variant="outline" className="text-nowrap">
            Breakfast
          </Badge>
        )}
        {recipe.is_lunch && (
          <Badge variant="outline" className="text-nowrap">
            Lunch
          </Badge>
        )}
        {recipe.is_dinner && (
          <Badge variant="outline" className="text-nowrap">
            Dinner
          </Badge>
        )}
        {recipe.is_dessert && (
          <Badge variant="outline" className="text-nowrap">
            Dessert
          </Badge>
        )}
        {recipe.is_snack && (
          <Badge variant="outline" className="text-nowrap">
            Snack
          </Badge>
        )}
      </CardFooter>
    </Card>
  )
}

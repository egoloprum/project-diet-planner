'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { Recipe } from '@/src/entities/recipe'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/src/shared/ui/card'

interface RecipeCardProps {
  recipe: Recipe
}

export const RecipeCard: FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link
            href={`discover/${recipe.id}`}
            className="cursor-pointer hover:underline">
            {recipe.food_name}
          </Link>
        </CardTitle>
        <CardDescription>{recipe.tag_cloud}</CardDescription>
      </CardHeader>
      <CardContent className="relative w-full h-64 overflow-hidden rounded-lg shadow-md">
        <Image
          src={recipe.images.image || '/default_thumbnail_recipe.jpg'}
          className="transition-transform duration-300 ease-in-out transform hover:scale-105 object-cover"
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
          alt={recipe.food_name}
        />
      </CardContent>
    </Card>
  )
}

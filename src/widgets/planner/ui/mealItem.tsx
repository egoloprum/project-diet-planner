'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { Recipe } from '@/src/entities/recipe'
import { Checkbox } from '@/src/shared/ui'

interface MealItemProps {
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'dessert'
  recipe: Recipe
}

export const MealItem: FC<MealItemProps> = ({ type, recipe }) => {
  return (
    <div className="py-4 bg-gray-50">
      <p className="flex items-end justify-between gap-2 px-4">
        <span className="text-base md:text-lg underline underline-offset-2 decoration-green-300 capitalize">
          {type}
        </span>
        <span className="text-gray-500 text-xs sm:text-sm lg:text-base">
          {recipe.calories}
        </span>
      </p>

      <section className="py-2 px-4 hover:bg-gray-100 flex items-center gap-4">
        <Checkbox />
        <div className="flex items-start gap-4 w-full">
          <Image
            src={recipe.images?.thumbnail || '/default_thumbnail_recipe.jpg'}
            height={100}
            width={100}
            loading="lazy"
            alt="thumbnail"
          />
          <p className="flex flex-col">
            <Link
              href={`/discover/${recipe.id}`}
              className="text-sm md:text-base underline underline-offset-2 decoration-green-300">
              {recipe.food_name}
            </Link>
            <span className="text-gray-500 text-xs sm:text-sm lg:text-base">
              1 serving
            </span>
          </p>
        </div>
      </section>
    </div>
  )
}

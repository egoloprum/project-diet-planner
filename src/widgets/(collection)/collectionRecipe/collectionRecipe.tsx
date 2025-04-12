'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { Recipe } from '@/src/shared/model'
import { Separator } from '@/src/shared/ui'

interface CollectionRecipeProps {
  recipes: Recipe[] | null
}

export const CollectionRecipe: FC<CollectionRecipeProps> = ({ recipes }) => {
  return (
    <>
      <h2 className="text-base sm:text-lg md:text-xl font-bold capitalize">
        Recipes
      </h2>
      <div className="w-full flex flex-col">
        {recipes?.map((recipe: Recipe) => (
          <div key={recipe.recipe_id}>
            <Link
              href={`/discover/${recipe.recipe_id}`}
              className="py-4 flex gap-2 hover:bg-gray-50 active:bg-gray-100 cursor-pointer">
              <Image
                src={
                  recipe?.images.thumbnail || '/default_thumbnail_recipe.jpg'
                }
                className="object-cover"
                width={100}
                height={100}
                loading="lazy"
                alt={recipe.food_name}
              />
              <div className="flex flex-col gap-2">
                <p>{recipe.food_name}</p>
                <p className="flex flex-row flex-wrap gap-1 md:gap-4 text-gray-500 text-sm">
                  <span>cal: {recipe.nutritions.calories}</span>
                  <span>carbs: {recipe.nutritions.carbs}</span>
                  <span>fats: {recipe.nutritions.fats}</span>
                  <span>protein: {recipe.nutritions.protein}</span>
                </p>
              </div>
            </Link>
            <Separator />
          </div>
        ))}
      </div>
    </>
  )
}

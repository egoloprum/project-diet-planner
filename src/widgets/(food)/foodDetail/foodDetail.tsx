import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import Image from 'next/image'
import { FC } from 'react'

import { Recipe } from '@/src/shared/model'

interface FoodDetailProps {
  recipe: Recipe
}

export const FoodDetail: FC<FoodDetailProps> = ({ recipe }) => {
  return (
    <>
      <AspectRatio ratio={1 / 1}>
        <Image
          src={recipe?.images.image || '/default_thumbnail_recipe.jpg'}
          className="object-cover"
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt={recipe.food_name}
        />
      </AspectRatio>
      <h1 className="text-base sm:text-lg md:text-xl font-bold">
        {recipe.food_name}
      </h1>
      <div>
        <p className="flex gap-2 justify-between text-sm sm:text-base">
          <span>Prep Time</span>
          <span>{recipe?.prep_time || 0}</span>
        </p>
        <p className="flex gap-2 justify-between text-sm sm:text-base">
          <span>Cook Time</span>
          <span>{recipe?.cook_time || 0}</span>
        </p>
      </div>
    </>
  )
}

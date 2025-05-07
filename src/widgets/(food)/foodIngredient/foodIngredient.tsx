import { FC } from 'react'

import { Recipe } from '@/src/shared/model'

interface FoodIngredientProps {
  recipe: Recipe
}

export const FoodIngredient: FC<FoodIngredientProps> = ({ recipe }) => {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-base sm:text-lg md:text-xl font-bold">Ingredients</p>
      <ul>
        {recipe?.ingredients.map((ingredient, index) => (
          <li key={index} className="text-sm sm:text-base relative">
            <span
              className="border border-gray-700 rounded-full w-1 h-1 
                sm:w-2 sm:h-2 absolute top-2 sm:top-2.25 left-0"></span>
            <span className="pl-4">{ingredient}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

import { FC } from 'react'

import { Recipe } from '@/src/shared/model'

interface FoodNutritionProps {
  recipe: Recipe
}

export const FoodNutrition: FC<FoodNutritionProps> = ({ recipe }) => {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-base sm:text-lg md:text-xl font-bold">Nutrition</p>
      <ul className="flex flex-col gap-1.5">
        <li className="flex gap-2 justify-between text-sm sm:text-base">
          <span>{recipe.calories} calories</span>
        </li>
        <li className="flex gap-2 justify-between text-sm sm:text-base">
          <span>{recipe.carbs} carbs</span>
        </li>
        <li className="flex gap-2 justify-between text-sm sm:text-base">
          <span>{recipe.fats} fats</span>
        </li>
        <li className="flex gap-2 justify-between text-sm sm:text-base">
          <span>{recipe.protein} protein</span>
        </li>
      </ul>
    </div>
  )
}

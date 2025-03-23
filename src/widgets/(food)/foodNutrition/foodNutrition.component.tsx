import { FC } from 'react'

interface FoodNutritionProps {
  recipe: Recipe
}

export const FoodNutrition: FC<FoodNutritionProps> = ({ recipe }) => {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-base sm:text-lg md:text-xl font-bold">Nutrition</p>
      <ul className="flex flex-col gap-1.5">
        {Object.entries(recipe?.nutritions ?? {}).map(([key, value]) => (
          <li
            key={key}
            className="flex gap-2 justify-between text-sm sm:text-base">
            <span>{key}</span>
            <span>{value || 0}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

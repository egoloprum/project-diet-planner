import { FC } from 'react'

import { Recipe } from '@/src/shared/model'

interface FoodDirectionProps {
  recipe: Recipe
}

export const FoodDirection: FC<FoodDirectionProps> = ({ recipe }) => {
  return (
    <section className="md:col-start-1 md:col-end-3 xl:col-start-3 xl:col-end-4">
      <p className="text-base sm:text-lg md:text-xl font-bold">Directions</p>
      <ul className="flex flex-col gap-1.5">
        {recipe.directions.map((dir, index: number) => (
          <li key={index + 1} className="text-sm sm:text-base flex gap-2">
            <span className="dark:text-black_border select-none">
              {index + 1}.
            </span>
            <span>{dir}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

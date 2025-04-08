import { FC } from 'react'

import { Recipe } from '@/src/shared/model'

interface CollectionRecipeProps {
  recipes: Recipe[] | null
}

export const CollectionRecipe: FC<CollectionRecipeProps> = ({ recipes }) => {
  return (
    <div>
      <h1 className="text-base sm:text-lg md:text-xl font-bold capitalize">
        Recipes
      </h1>
      <div>
        {recipes?.map((recipe: Recipe) => (
          <div key={recipe.recipe_id}>{recipe.food_name}</div>
        ))}
      </div>
    </div>
  )
}

import { FC } from 'react'

import { RecipeCard } from '@/src/shared/components/recipeCard'
import { Recipe } from '@/src/shared/model'

interface RecipeListProps {
  recipeData: Recipe[] | null
}

export const RecipeList: FC<RecipeListProps> = ({ recipeData }) => {
  return (
    <div className={`py-4 gap-4 recipeList`}>
      {recipeData?.map((recipe: Recipe) => (
        <div
          key={recipe.recipe_id}
          className="break-inside-avoid mb-4 min-w-[300px]">
          <RecipeCard recipe={recipe} />
        </div>
      ))}
    </div>
  )
}

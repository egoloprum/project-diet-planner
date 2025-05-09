import { FC } from 'react'

import { Recipe } from '@/src/entities/recipe'

import { RecipeCard } from './recipeCard'

interface RecipeListProps {
  recipeData: Recipe[] | null
}

export const RecipeList: FC<RecipeListProps> = ({ recipeData }) => {
  return (
    <div className={`py-4 gap-4 recipeList`}>
      {recipeData?.map((recipe: Recipe) => (
        <div key={recipe.id} className="break-inside-avoid mb-4 min-w-[300px]">
          <RecipeCard recipe={recipe} />
        </div>
      ))}
    </div>
  )
}

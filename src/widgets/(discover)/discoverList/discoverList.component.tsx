import { FC } from 'react'

import { DiscoverCard } from '../discoverCard'

interface DiscoverListProps {
  recipeData: Recipe[] | null
}

export const DiscoverList: FC<DiscoverListProps> = ({ recipeData }) => {
  return (
    <div className={`py-4 gap-4 discoverList`}>
      {recipeData?.map((recipe: Recipe) => (
        <div
          key={recipe.recipe_id}
          className="break-inside-avoid mb-4 min-w-[300px]">
          <DiscoverCard recipe={recipe} />
        </div>
      ))}
    </div>
  )
}

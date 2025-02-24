import { FC } from 'react'
import Image from 'next/image'

import { Badge } from '@/src/shared/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/src/shared/ui/card'

interface DiscoverCardProps {
  recipe: Recipe
}

export const DiscoverCard: FC<DiscoverCardProps> = ({recipe}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{recipe.food_name}</CardTitle>
        <CardDescription>{recipe.tag_cloud}</CardDescription>
      </CardHeader>
      <CardContent className='relative w-full h-64 overflow-hidden rounded-lg shadow-md'>
        <Image
          src={recipe.images.image ? recipe.images.image : '/default_thumbnail_recipe.jpg'}
          layout="fill"
          objectFit="cover"
          alt={recipe.food_name}
          className="transition-transform duration-300 ease-in-out transform hover:scale-105"
        />
      </CardContent>
      <CardFooter className='flex flex-wrap gap-2'>
        {recipe.is_main_dish && <Badge variant="outline" className='text-nowrap'>Main Dish</Badge>}
        {recipe.is_breakfast && <Badge variant="outline" className='text-nowrap'>Breakfast</Badge>}
        {recipe.is_lunch && <Badge variant="outline" className='text-nowrap'>Lunch</Badge>}
        {recipe.is_dinner && <Badge variant="outline" className='text-nowrap'>Dinner</Badge>}
        {recipe.is_dessert && <Badge variant="outline" className='text-nowrap'>Dessert</Badge>}
        {recipe.is_snack && <Badge variant="outline" className='text-nowrap'>Snack</Badge>}
      </CardFooter>
    </Card>
  )
}



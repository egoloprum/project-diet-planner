'use client'

import Image from 'next/image'
import { FC } from 'react'

import { Checkbox } from '@/src/shared/ui'

interface MealItemProps {
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'dessert'
}

export const MealItem: FC<MealItemProps> = ({ type }) => {
  return (
    <div className="py-4 bg-gray-50">
      <p className="flex items-end justify-between gap-2 px-4">
        <span className="text-base md:text-lg underline underline-offset-2 decoration-green-300 capitalize">
          {type}
        </span>
        <span className="text-gray-500 text-xs sm:text-sm lg:text-base">
          254 calories
        </span>
      </p>

      <ul className="flex flex-col gap-2">
        <li className="py-2 px-4 hover:bg-gray-100 flex items-center gap-4">
          <Checkbox />
          <div className="flex items-start gap-4 w-full">
            <Image
              src="/default_thumbnail_recipe.jpg"
              height={100}
              width={100}
              loading="lazy"
              alt="thumbnail"
            />
            <p className="flex flex-col">
              <span className="text-sm md:text-base underline underline-offset-2 decoration-green-300">
                Fried Chicken And Egg Rice Bowl (Chicken Katsudon)
              </span>
              <span className="text-gray-500 text-xs sm:text-sm lg:text-base">
                1 serving
              </span>
            </p>
          </div>
        </li>
        <li className="py-2 px-4 hover:bg-gray-100 flex items-center gap-4">
          <Checkbox />
          <div className="flex items-start gap-4 w-full">
            <Image
              src="/default_thumbnail_recipe.jpg"
              height={100}
              width={100}
              loading="lazy"
              alt="thumbnail"
            />
            <p className="flex flex-col">
              <span className="text-sm md:text-base underline underline-offset-2 decoration-green-300">
                Fried Chicken And Egg Rice Bowl (Chicken Katsudon)
              </span>
              <span className="text-gray-500 text-xs sm:text-sm lg:text-base">
                1 serving
              </span>
            </p>
          </div>
        </li>
      </ul>
    </div>
  )
}

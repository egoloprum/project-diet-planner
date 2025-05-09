import { FC } from 'react'

import { Diet } from '@/src/entities/diet'
import { DietItemForm } from '@/src/features/diet'

import { defaultDiets } from '../lib/data'

interface DietListProps {
  selectedDiet: Diet
  user_id: string
  className?: string
}

export const DietList: FC<DietListProps> = ({
  selectedDiet,
  user_id,
  className
}) => {
  return (
    <ul className={`${className}`}>
      {defaultDiets.map((defaultDiet, index) => (
        <li key={index} className="h-full w-full">
          <DietItemForm
            defaultDiet={defaultDiet}
            selectedDiet={selectedDiet}
            user_id={user_id}
          />
        </li>
      ))}
    </ul>
  )
}

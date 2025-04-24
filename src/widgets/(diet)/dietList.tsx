import { FC } from 'react'

import { DietItemForm } from '@/src/features/diet-item-form'
import { PrimaryDiet } from '@/src/shared/model'

import { defaultDiets } from './data'

interface DietListProps {
  selectedDiet: PrimaryDiet
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

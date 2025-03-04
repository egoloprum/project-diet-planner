import { FC } from 'react'
import { defaultDiets } from './data'
import { DietItemForm } from '@/src/features/diet-item-form'

interface DietListProps {
  selectedDiet: PrimaryDiet
  user_id: string 
}

export const DietList: FC<DietListProps> = ({selectedDiet, user_id}) => {
  return (
    <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 grid-auto-rows-fr'>
      {defaultDiets.map((defaultDiet, index) => (
        <li key={index} className='h-full w-full'>
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


"use client"

import { FC, useEffect, useState } from 'react'
import { defaultExclusions } from './data'
import { ExclusionItemForm } from '@/src/features/exclusion-item-form'
import axios from 'axios'

interface DefaultExclusionListProps {
  selectedExclusions: string[]
  user_id: string 
}

export const DefaultExclusionList: FC<DefaultExclusionListProps> = ({selectedExclusions, user_id}) => {
  const [selectItem, setSelectItem] = useState<string[]>(selectedExclusions)

  useEffect(() => {
    const updateExclusions = async () => {
      try {
        const response = await axios.post('/api/exclusions/update', {
          user_id,
          exclusions: selectItem,
        })
        console.log(response.data.message)
      } catch (error) {
        console.error('Error updating exclusions:', error)
      }
    }

    if (selectItem !== selectedExclusions) {
      updateExclusions()
    }
  }, [selectItem])
  
  return (
    <ul className="flex flex-col gap-4">
      {defaultExclusions.map((defaultList, index1) => {
        return (
          <li key={index1} className='flex flex-col gap-2'>
            <p className="text-base sm:text-lg md:text-xl font-bold">{defaultList.name}</p>

            <div className="flex flex-wrap gap-2">
              {defaultList.list.map((exclusionItem, index2) => (
                <ExclusionItemForm 
                  key={`${index1}-${index2}`} 
                  exclusionItem={exclusionItem} 
                  selectItem={selectItem} 
                  user_id={user_id} 
                  setSelectItem={setSelectItem}
                />
              ))}
            </div>
          </li>
        )
      })}
    </ul>
  )
}

'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'

import { ExclusionItemForm } from '@/src/features/exclusion-item-form'

import { defaultExclusions } from './data'

interface DefaultExclusionListProps {
  selectedExclusions: string[]
  user_id: string
}

export const DefaultExclusionList: FC<DefaultExclusionListProps> = ({
  selectedExclusions,
  user_id
}) => {
  const [selectItem, setSelectItem] = useState<string[]>(selectedExclusions)

  const router = useRouter()

  useEffect(() => {
    const updateExclusions = async () => {
      try {
        await axios.post('/api/exclusions/update', {
          user_id,
          exclusions: selectItem
        })
        router.refresh()
      } catch {}
    }

    if (selectItem !== selectedExclusions) {
      updateExclusions()
    }
  }, [selectItem])

  return (
    <ul className="flex flex-col gap-4">
      {defaultExclusions.map((defaultList, index1) => {
        return (
          <li key={index1} className="flex flex-col gap-2">
            <p className="text-base sm:text-lg md:text-xl font-bold">
              {defaultList.name}
            </p>

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

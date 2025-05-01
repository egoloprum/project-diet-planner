'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'

import { ExclusionItemForm } from '@/src/features/exclusion-item-form'
import { useToast } from '@/src/shared/hooks'

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
  const { toast } = useToast()

  useEffect(() => {
    const updateExclusions = async () => {
      try {
        await axios.post('/api/exclusions/update', {
          user_id,
          exclusions: selectItem
        })

        toast({
          variant: 'default',
          title: 'Exclusion is updated successfully!'
        })

        router.refresh()
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast({
            variant: 'destructive',
            title: error.response?.data?.error || 'Update failed!'
          })
        } else {
          toast({
            variant: 'destructive',
            title: 'An unexpected error occurred!'
          })
        }
      }
    }

    if (selectItem !== selectedExclusions) {
      updateExclusions()
    }
  }, [selectItem])

  return (
    <ul className="recipeList gap-4">
      {defaultExclusions.map((defaultList, index1) => {
        return (
          <li
            key={index1}
            className="flex flex-col flex-nowrap py-2 gap-2 break-inside-avoid">
            <p className="text-base sm:text-base md:text-lg underline underline-offset-2 decoration-green-300 select-none">
              {defaultList.name}
            </p>

            <div className="flex flex-wrap gap-2 max-w-[600px]">
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

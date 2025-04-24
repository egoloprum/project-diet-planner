'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'

import { ExclusionItemForm } from '@/src/features/exclusion-item-form'
import { useToast } from '@/src/shared/hooks'

interface SetupExclusionListProps {
  selectedExclusions: string[]
  user_id: string
}

const defaultExclusions = [
  'Gluten',
  'Peanuts',
  'Eggs',
  'Fish',
  'Milk',
  'Soy',
  'Shellfish',
  'Pork'
]

export const SetupExclusionList: FC<SetupExclusionListProps> = ({
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
    <ul className="flex flex-wrap gap-2">
      {defaultExclusions.map((exclusionItem, index) => {
        return (
          <li key={index}>
            <ExclusionItemForm
              exclusionItem={exclusionItem}
              selectItem={selectItem}
              user_id={user_id}
              setSelectItem={setSelectItem}
            />
          </li>
        )
      })}
    </ul>
  )
}

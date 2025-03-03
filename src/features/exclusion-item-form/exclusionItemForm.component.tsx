"use client"

import { Button } from '@/src/shared/ui/button'
import { Dispatch, FC, SetStateAction } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface ExclusionItemFormProps {
  exclusionItem: string
  user_id: string 
  selectItem: string[]
  setSelectItem: Dispatch<SetStateAction<string[]>>
}

type ExclusionInput = {
  exclusionItem: string
  user_id: string 
}

export const ExclusionItemForm: FC<ExclusionItemFormProps> = ({exclusionItem, user_id, selectItem, setSelectItem}) => {
  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm<ExclusionInput>()

  const onSubmit: SubmitHandler<ExclusionInput> = async () => {
    if (selectItem.includes(exclusionItem)) {
      setSelectItem(selectItem.filter(item => item !== exclusionItem))
    }
    else {
      setSelectItem([...selectItem, exclusionItem])
    }
  }

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)}
      action=""
    >
      <input type="hidden" className="hidden" {...register('user_id')} defaultValue={user_id} />
      <input type="hidden" className="hidden" {...register('exclusionItem')} defaultValue={exclusionItem} />
      <Button
        variant='outline'
        type='submit'
        className={`${selectItem.includes(exclusionItem) && 'bg-purple-100'}`}
      >
        {exclusionItem}
      </Button>
    </form>
  )
}

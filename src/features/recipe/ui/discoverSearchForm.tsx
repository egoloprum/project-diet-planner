'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Input } from '@/src/shared/ui/input'

type SearchInput = {
  searchValue: string
}

export const DiscoverSearchForm = ({}) => {
  const {
    register,
    handleSubmit,
    formState: {}
  } = useForm<SearchInput>()

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const [searchParam, setSearchParam] = useState<string>('')

  const onSubmit: SubmitHandler<SearchInput> = () => {
    const sanitizedValue = searchParam
      .replace(/[^a-zA-Z\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
    setSearchParam(sanitizedValue)

    const params = new URLSearchParams(searchParams || '')

    params.delete('page')

    if (sanitizedValue.length) {
      params.set('query', sanitizedValue)
    } else {
      params.delete('query')
    }

    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <Input
        placeholder="Search..."
        {...register('searchValue')}
        className="rounded-xl"
        onChange={e => setSearchParam(e.target.value)}
      />
    </form>
  )
}

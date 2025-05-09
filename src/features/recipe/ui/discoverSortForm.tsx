'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { Button } from '@/src/shared/ui'

export const DiscoverSortForm = ({}) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const currentSorting = searchParams.get('sorting')

  const handleClick = (keyword: string) => {
    const params = new URLSearchParams(searchParams || '')
    params.delete('page')

    if (currentSorting === keyword) {
      params.delete('sorting')
    } else {
      params.set('sorting', keyword)
    }
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-4">
      <Button
        type="button"
        variant={currentSorting === 'calories' ? 'default' : 'secondary'}
        onClick={() => handleClick('calories')}>
        Calories
      </Button>
      <Button
        type="button"
        variant={currentSorting === 'carbs' ? 'default' : 'secondary'}
        onClick={() => handleClick('carbs')}>
        Carbs
      </Button>
      <Button
        type="button"
        variant={currentSorting === 'fats' ? 'default' : 'secondary'}
        onClick={() => handleClick('fats')}>
        Fats
      </Button>
      <Button
        type="button"
        variant={currentSorting === 'protein' ? 'default' : 'secondary'}
        onClick={() => handleClick('protein')}>
        Protein
      </Button>
    </div>
  )
}

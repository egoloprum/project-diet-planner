'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

import { Button } from '@/src/shared/ui/button'

export const DiscoverFilterForm = ({}) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const currentFilter = searchParams.get('filter')

  const handleClick = (keyword: string) => {
    const params = new URLSearchParams(searchParams || '')
    params.delete('page')

    if (currentFilter === keyword) {
      params.delete('filter')
    } else {
      params.set('filter', keyword)
    }
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        type="button"
        variant={currentFilter === 'breakfast' ? 'default' : 'secondary'}
        onClick={() => handleClick('breakfast')}>
        Breakfast
      </Button>
      <Button
        type="button"
        variant={currentFilter === 'lunch' ? 'default' : 'secondary'}
        onClick={() => handleClick('lunch')}>
        Lunch
      </Button>
      <Button
        type="button"
        variant={currentFilter === 'dinner' ? 'default' : 'secondary'}
        onClick={() => handleClick('dinner')}>
        Dinner
      </Button>
      <Button
        type="button"
        variant={currentFilter === 'snack' ? 'default' : 'secondary'}
        onClick={() => handleClick('snack')}>
        Snack
      </Button>
      <Button
        type="button"
        variant={currentFilter === 'dessert' ? 'default' : 'secondary'}
        onClick={() => handleClick('dessert')}>
        Dessert
      </Button>
    </div>
  )
}

'use client'

import {
  DiscoverFilterForm,
  DiscoverSearchForm,
  DiscoverSortForm
} from '@/src/features/recipe'

export const DiscoverSearchBar = ({}) => {
  return (
    <div className="py-4 place-content-center flex flex-col flex-wrap">
      <div className="max-w-100 flex flex-col gap-4">
        <DiscoverSearchForm />
        <DiscoverFilterForm />

        <div className="flex items-center gap-4">
          <p>Descending</p>
          <span className="w-full border-b-2"></span>
          <p>Ascending</p>
        </div>

        <DiscoverSortForm />
      </div>
    </div>
  )
}

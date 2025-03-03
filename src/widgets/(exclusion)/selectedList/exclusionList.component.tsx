import { FC } from 'react'

interface SelectedExclusionListProps {
  selectedExclusions: Exclusion | null
}

export const SelectedExclusionList: FC<SelectedExclusionListProps> = ({selectedExclusions}) => {
  return (
    <div className='flex flex-col gap-2'>
      <p className='text-base sm:text-lg md:text-xl font-bold'>Your exclusions</p>

      <ul className='flex gap-2 flex-wrap'>
        {selectedExclusions?.list.map((exclusion_item: string, index) => (
          <li key={index} className='border-2 border-border_purple rounded w-fit text-sm sm:text-base p-2 px-4 select-none'>
            {exclusion_item}
          </li>
        ))}
      </ul>
    </div>
  )
}


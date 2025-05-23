import { FC } from 'react'

interface SelectedExclusionListProps {
  selectedExclusions: string[]
}

export const SelectedExclusionList: FC<SelectedExclusionListProps> = ({
  selectedExclusions
}) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-base sm:text-lg md:text-xl underline underline-offset-2 decoration-green-300 select-none">
        Your exclusions
      </p>

      {selectedExclusions.length ? (
        <ul className="flex gap-2 flex-wrap">
          {selectedExclusions.map((exclusion_item: string, index) => (
            <li
              key={index}
              className="border-2 border-border_purple rounded-xl w-fit text-sm sm:text-base p-2 px-4 select-none">
              {exclusion_item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-sm sm:text-base">
          No product is excluded yet.
        </p>
      )}
    </div>
  )
}

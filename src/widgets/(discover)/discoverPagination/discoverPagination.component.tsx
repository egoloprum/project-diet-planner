import { FC } from 'react'

import {  
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious, 
} from '@/src/shared/ui/pagination'

interface DiscoverPaginationProps {
  currentPage: number
  totalPages: number
  query: string
}

const range = (start: number, end: number) => {
  const length = end - start + 1
  return Array.from({ length }, (_, i) => start + i)
}

const getPaginationRange = (current: number, total: number) => {
  if (total <= 6) return range(1, total)
  
  const shouldShowLeftEllipsis = current > 3
  const shouldShowRightEllipsis = current < total - 2
  
  if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    return [1, 2, 3, 4, 'ellipsis', total]
  }
  
  if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
    return [1, 'ellipsis', total - 3, total - 2, total - 1, total]
  }
  
  return [
    1,
    'ellipsis',
    ...range(current - 1, current + 1),
    'ellipsis',
    total
  ]
}

export const DiscoverPagination: FC<DiscoverPaginationProps> = ({
  currentPage,
  totalPages,
  query
}) => {
  const pages = getPaginationRange(currentPage, totalPages)
  
  const createURL = (page: number) => {
    const params = new URLSearchParams({
      query,
      page: page.toString()
    })
    return `?${params.toString()}`
  }

  return (
    <Pagination className='py-4'>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            href={createURL(currentPage - 1)}
            aria-disabled={currentPage <= 1}
            tabIndex={currentPage <= 1 ? -1 : undefined}
            className={currentPage <= 1 ? 'pointer-events-none opacity-50' : undefined}
          />
        </PaginationItem>

        {pages.map((page, index) => (
          <PaginationItem key={index}>
            {page === 'ellipsis' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={createURL(page as number)}
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext 
            href={createURL(currentPage + 1)}
            aria-disabled={currentPage >= totalPages}
            tabIndex={currentPage >= totalPages ? -1 : undefined}
            className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

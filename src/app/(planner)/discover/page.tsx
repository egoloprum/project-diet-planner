import { getProfile } from '@/src/shared/db'
import { recipeSearch } from '@/src/shared/db/recipe/recipeHelpers'
import { createClient } from '@/src/shared/db/supabase'
import { DiscoverPagination } from '@/src/widgets/(discover)/discoverPagination'
import { DiscoverSearchBar } from '@/src/widgets/(discover)/discoverSearchBar'
import { RecipeList } from '@/src/widgets/(discover)/recipeList'
import { redirect } from 'next/navigation'

interface SearchParams {
  query: string
  page: string
}

const page = async ({
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) => {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    return redirect('/login')
  }

  const user_id = data.user.id
  const profile = await getProfile(user_id)

  if (!profile?.is_setup) {
    redirect('/setup')
  }

  const resolvedSearchParams = await searchParams
  const query = resolvedSearchParams?.query || ''

  const pageSize = 10
  const currentPage = parseInt(resolvedSearchParams?.page || '1', 10)

  let recipeData = null
  let totalPages = 0

  if (query.length) {
    recipeData = await recipeSearch(query, currentPage, pageSize)
    totalPages = Math.ceil(recipeData.total / pageSize)
  }

  return (
    <div className="min-h-[calc(100vh-200px)]">
      <DiscoverSearchBar />
      <RecipeList recipeData={recipeData?.recipes || []} />

      {totalPages > 1 && (
        <DiscoverPagination
          currentPage={currentPage}
          totalPages={totalPages}
          query={query}
        />
      )}
    </div>
  )
}

export default page

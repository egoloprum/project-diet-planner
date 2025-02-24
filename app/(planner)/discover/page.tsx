import { DiscoverList } from "@/src/widgets/(discover)/discoverList";
import { DiscoverSearchBar } from "@/src/widgets/(discover)/discoverSearchBar";

import { recipeSearch } from "@/src/app/db/recipe/recipeHelpers";
import { DiscoverPagination } from "@/src/widgets/(discover)/discoverPagination";

interface SearchParams {
  query:    string
  page:     string
}

const page = async ({
  searchParams
}: {searchParams: Promise<SearchParams>}) => {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.query || '';

  let recipeData = null
  if (query.length) {
    recipeData = await recipeSearch(query)
  }

  return (
    <>
      <DiscoverSearchBar />
      <DiscoverList recipeData={recipeData} />

      { query.length && <DiscoverPagination /> }
    </>
  )
}

export default page

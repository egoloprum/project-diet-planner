import { DiscoverList } from "@/src/widgets/(discover)/discoverList";
import { DiscoverSearchBar } from "@/src/widgets/(discover)/discoverSearchBar";

import { recipeSearch } from "@/src/shared/db/recipe/recipeHelpers";
import { DiscoverPagination } from "@/src/widgets/(discover)/discoverPagination";

interface SearchParams {
  query: string;
  page: string;
}

const page = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.query || "";

  const pageSize = 10;
  const currentPage = parseInt(resolvedSearchParams?.page || "1", 10);

  let recipeData = null;
  let totalPages = 0;

  if (query.length) {
    recipeData = await recipeSearch(query, currentPage, pageSize);
    totalPages = Math.ceil(recipeData.total / pageSize);
  }

  return (
    <>
      <DiscoverSearchBar />
      <DiscoverList recipeData={recipeData?.recipes || []} />

      {totalPages > 1 && (
        <DiscoverPagination
          currentPage={currentPage}
          totalPages={totalPages}
          query={query}
        />
      )}
    </>
  );
};

export default page;

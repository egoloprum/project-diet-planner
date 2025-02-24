import { DiscoverSearchBar } from "@/src/widgets/discoverSearchBar";

interface SearchParams {
  query:    string
  page:     string
}

const page = async ({
  searchParams
}: {searchParams: Promise<SearchParams>}) => {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.query || '';

  console.log("query", query)

  return (
    <DiscoverSearchBar />
  )
}

export default page

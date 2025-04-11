import { NotFound } from '@/src/shared/components/notFound'
import { blogGetById } from '@/src/shared/db'
import { createClient } from '@/src/shared/db/supabase'

interface pageProps {
  params: {
    id: string
  }
}
const page = async ({ params }: { params: Promise<pageProps['params']> }) => {
  const resolvedParams = await params
  const { id } = resolvedParams

  const blog = await blogGetById(Number(id))

  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  const user = data.user

  if (!blog || !user) {
    return <NotFound href="/blog" />
  }

  return <div>page</div>
}

export default page

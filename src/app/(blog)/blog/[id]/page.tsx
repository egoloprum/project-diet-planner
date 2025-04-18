import { BlogDeleteModal } from '@/src/features/(blog)/blog-delete-modal'
import { BlogEditModal } from '@/src/features/(blog)/blog-edit-modal'
import { NotFound } from '@/src/shared/components/notFound'
import { blogGetById } from '@/src/shared/db'
import { createClient } from '@/src/shared/db/supabase'
import { BlogDetail } from '@/src/widgets/(blog)/blogDetail'
import { BlogItems } from '@/src/widgets/(blog)/blogItems'

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

  return (
    <article className="flex gap-8 flex-col md:flex-row">
      <section className="w-fit flex flex-col gap-4">
        <BlogDetail blog={blog} userId={user.id} />

        {user.id === blog.user_id && (
          <div className="flex gap-4 flex-wrap sm:flex-nowrap">
            <BlogEditModal userId={user.id} blog={blog} />
            <BlogDeleteModal blogId={blog.id} />
          </div>
        )}
      </section>
      <section className="w-full">
        <BlogItems blog={blog} />
      </section>
    </article>
  )
}

export default page

import { redirect } from 'next/navigation'

import { blogGetById } from '@/src/entities/blog'
import { getProfile } from '@/src/entities/profile'
import { BlogDeleteModal, BlogEditModal } from '@/src/features/blog'
import { NotFound } from '@/src/shared/components/notFound'
import { createClient } from '@/src/shared/db/supabase'
import { BlogDetail, BlogItems } from '@/src/widgets/blog'

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

  const user_id = data.user.id
  const profile = await getProfile(user_id)

  if (!profile?.is_setup) {
    redirect('/setup')
  }

  return (
    <article className="flex gap-8 flex-col md:flex-row min-h-[calc(100vh-200px)]">
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

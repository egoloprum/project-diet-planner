import { redirect } from 'next/navigation'

import { blogGetByOthers, blogGetByUser } from '@/src/entities/blog'
import { getProfile } from '@/src/entities/profile'
import { BlogCreateModal } from '@/src/features/blog'
import { createClient } from '@/src/shared/db/supabase'
import { BlogByOthers, BlogList } from '@/src/widgets/blog'

const page = async ({}) => {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    return redirect('/login')
  }

  const user = data.user
  const profile = await getProfile(user.id)

  if (!profile?.is_setup) {
    redirect('/setup')
  }

  const blogs = await blogGetByUser(user.id)
  const blogsByOthers = await blogGetByOthers(user.id)

  return (
    <div className="min-h-[calc(100vh-185.5px)]">
      <BlogCreateModal userId={user.id} />

      <p className="text-lg font-bold">Blog by You</p>

      {blogs ? (
        <BlogList blogData={blogs} />
      ) : (
        <p>There is not any blog by you yet.</p>
      )}

      <BlogByOthers blogData={blogsByOthers} />
    </div>
  )
}

export default page

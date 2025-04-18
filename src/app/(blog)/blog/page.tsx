import { redirect } from 'next/navigation'

import { BlogCreateForm } from '@/src/features/(blog)/blog-create-form'
import { blogGetByOthers, blogGetByUser } from '@/src/shared/db'
import { createClient } from '@/src/shared/db/supabase'
import { BlogByOthers } from '@/src/widgets/(blog)/blogByOthers'
import { BlogList } from '@/src/widgets/(blog)/blogList'

const page = async ({}) => {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    return redirect('/login')
  }

  const user = data.user

  const blogs = await blogGetByUser(user.id)

  const blogsByOthers = await blogGetByOthers(user.id)

  return (
    <div>
      <BlogCreateForm userId={user.id} />

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

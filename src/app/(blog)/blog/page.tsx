import { redirect } from 'next/navigation'

import { BlogCreateForm } from '@/src/features/(blog)/blog-create-form'
import { blogGetByUser } from '@/src/shared/db'
import { createClient } from '@/src/shared/db/supabase'
import { BlogList } from '@/src/widgets/(blog)/blogList'

const page = async ({}) => {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    return redirect('/login')
  }

  const user = data.user
  const blogs = await blogGetByUser(user.id)

  return (
    <div>
      <BlogCreateForm userId={user.id} />
      <BlogList blogData={blogs} />
    </div>
  )
}

export default page

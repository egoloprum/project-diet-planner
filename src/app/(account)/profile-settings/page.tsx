import { ProfileEditForm } from '@/src/features/profile-edit-form'
import { NotFound } from '@/src/shared/components/notFound'
import { getProfile } from '@/src/shared/db'
import { createClient } from '@/src/shared/db/supabase'

const page = async ({}) => {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  const user = data.user

  if (!user || !user.email) {
    return (
      <NotFound
        href=""
        text="This page can not be accessed by unverified user."
      />
    )
  }

  const profile = await getProfile(user.id)

  if (!profile) {
    return <NotFound href="" text="Something went wrong. Try again later." />
  }

  return <ProfileEditForm user={data.user} profile={profile} />
}

export default page

import { ProfileSettingsForm } from '@/src/features/profile-settings-form'
import { createClient } from '@/src/shared/db/supabase'

const page = async ({}) => {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  if (data.user?.email) {
    return <ProfileSettingsForm user={data.user} />
  } else {
    return <p>This page can not be accessed by unverified user.</p>
  }
}

export default page
